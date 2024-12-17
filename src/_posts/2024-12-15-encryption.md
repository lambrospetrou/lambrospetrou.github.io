---
title: "How to do encryption and envelope encryption with KMS in Go"
description: "Understand encryption, envelope encryption, and how to implement them in Go code."
---

**Table of contents**

-   [Symmetric encryption](#symmetric-encryption)
    -   [Symmetric encryption in Go](#symmetric-encryption-in-go)
    -   [Data encryption keys](#data-encryption-keys)
-   [Envelope encryption](#envelope-encryption)
    -   [Envelope encryption in Go](#envelope-encryption-in-go)
    -   [Envelope encryption with KMS](#envelope-encryption-with-kms)
-   [Key rotation](#key-rotation)
-   [Multi-level envelope encryption](#multi-level-envelope-encryption)
-   [Conclusion](#conclusion)

In this article, I will go through the basics of symmetric data encryption, then move to envelope encryption using our own key encryption key or using a Key Management Service (KMS) from a cloud provider, and how that can be generalised to multiple levels of envelope encryption.

I will provide examples in Go code taken out from my own applications to make things concrete and understandable.

## Symmetric encryption

There are millions of resources about encryption, but in this article I will focus on **symmetric encryption** of arbitrary data.

The goal of encryption is to convert some piece of data `A` (namely **plaintext**) into some different piece of data `B` (namely **ciphertext**) using a secret data encryption key `DEK`.
The data `B` will seem like random garbage to anyone looking at it, and only the ones in possesion of key `DEK` can reverse the conversion back to `A`.

Therefore, we use encryption to protect sensitive data and stop worrying if someone inadvertedly gets access to it.

The conversion from `A` to `B` is called **encryption**, and the reverse is called **decryption**.

<figure>
  <img src="/articles-data/2024-12-15-encryption/2024-06-11_article_encryption-symmetric.svg" title="Symmetric encryption diagram" alt="Symmetric encryption diagram"/>
  <figcaption>Symmetric encryption with a data encryption key.</figcaption>
</figure>

For example, if we encrypt the plaintext `Hello, World!` with a specific algorithm and secret key, we will end up with the following ciphertext:

```txt
2YjP8xC8owzTkLrvEdHjUY2q6QWicr6n1Te0sAso5oR7KaCufSiebQadhQ82js01wRd135Q
```

The above seemingly random text can be stored anywhere without worrying about anyone ever figuring out that the actual plaintext data is `Hello, World!`.

Encryption can be used everywhere and for everything.

-   I [encrypt files containing my passwords and sensitive information](/articles/encrypt-files-with-password-linux/) before storing them on Google Drive.
-   [NASA uses it to protect files](https://www.nas.nasa.gov/hecc/support/kb/using-gpg-to-encrypt-your-data_242.html) transferred inside their infrastructure.
-   Every time you visit a website over HTTPS you use encryption for communication between your device and the server handling those requests ([see the awesome How HTTPS Works tutorial](https://howhttps.works/the-keys/)).
-   Most cloud providers encrypt customer data in transit and at rest with our own or their keys.
-   You can encrypt your laptop disk drives ([see Windows Bitlocker](https://support.microsoft.com/en-gb/windows/device-encryption-in-windows-cf7e2b6f-3e70-4882-9532-18633605b7df)) so that your data is secure by someone taking off your disk drive and reading it on a separate machine.
-   more, more, more...

My favourite online resources about security and encryption are the following:

-   [Cryptographic Right Answers by Latacora](https://www.latacora.com/blog/2018/04/03/cryptographic-right-answers/)
-   [Cryptographic Storage Cheat Sheet by OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html#algorithms)
-   Reference documentation by Key Management Services I use (like [AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)).

As of today, the recommended algorithms to use for symmetric encryption is 256-bit Advanced Encryption Standard (AES) in Galois Counter Mode (GCM) or `XSalsa20+Poly1305` with a 256-bit data encryption key.

### Symmetric encryption in Go

Let's get into specifics on how to safely implement symmetric encryption in our applications.

I will be using Go code in this article without any third-party libraries, since the Go standard library has everything we need in [the `crypto` package](https://pkg.go.dev/crypto) (and its sub-packages).

The function `GenerateKeyBytes` below generates `256-bit` (32-bytes) data encryption keys that will be used throughout the whole article.

```go
import (
	"crypto/rand"

	"golang.org/x/crypto/chacha20poly1305"
)

const KeySize = chacha20poly1305.KeySize

// GenerateKey returns a 32-byte key as per the chacha20poly1305 algorithm.
func GenerateKeyBytes() []byte {
	b := make([]byte, KeySize)
	_, err := rand.Read(b)
    if err != nil {
        panic("unexpected failure: could not generate random data")
    }
	return b
}
```

The following functions implement symmetric encrypting/decryption.

```go
func EncryptBytes(key []byte, plainData []byte) ([]byte, error) {
	// We use this algorithm based on the recommendation of https://www.latacora.com/blog/2018/04/03/cryptographic-right-answers/#encrypting-data
	// Alternative could be AES-256 GCM: https://pkg.go.dev/crypto/cipher#NewGCM

	aead, err := chacha20poly1305.NewX(key)
	if err != nil {
		return nil, fmt.Errorf("failed to create encryption AEAD: %w", err)
	}

	// Select a random nonce, and leave capacity for the ciphertext.
	nonce := make([]byte, aead.NonceSize(), aead.NonceSize()+len(plainData)+aead.Overhead())
	if _, err := rand.Read(nonce); err != nil {
		return nil, fmt.Errorf("failed to encrypt: %w", err)
	}
	// Encrypt the message and append the ciphertext to the nonce.
	encryptedMsg := aead.Seal(nonce, nonce, plainData, nil)

    return encryptedMsg, nil
}

func DecryptBytes(key []byte, encryptedData []byte) ([]byte, error) {
	aead, err := chacha20poly1305.NewX(key)
	if err != nil {
		return nil, fmt.Errorf("failed to create encryption AEAD: %w", err)
	}
	if len(encryptedData) < aead.NonceSize() {
		return nil, fmt.Errorf("ciphertext is too short: %d < %d", len(encryptedData), aead.NonceSize())
	}

	// Split nonce and ciphertext.
	nonce, ciphertext := encryptedData[:aead.NonceSize()], encryptedData[aead.NonceSize():]

	// Decrypt the message and check it wasn't tampered with.
	plainData, err := aead.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to decrypt: %w", err)
	}

	return plainData, nil
}
```

And to test the above you can use the following test:

```go
func TestEncryptDecrypt(t *testing.T) {
	key := []byte("supersecretkey32byteslong1234567")
	plaintext := "Hello, World!"

	ciphertext, err := encryption.Encrypt(key, plaintext)
	if err != nil {
		t.Fatalf("Encrypt failed: %v", err)
	}
	if ciphertext == plaintext {
		t.Errorf("Encrypt: plaintext same as cipherText, got %s, want %s", ciphertext, plaintext)
	}

	decryptedPlaintext, err := encryption.Decrypt(key, encResult.CipherText)
	if err != nil {
		t.Fatalf("Decrypt failed: %v", err)
	}
	if decryptedPlaintext != plaintext {
		t.Errorf("Decrypt: plaintext mismatch, got %s, want %s", decryptedPlaintext, plainText)
	}
}
```

### Data encryption keys

The data encryption key (DEK) is maybe the most crucial component in encryption (apart from the encryption algorithm itself).
Anyone with the DEK can decrypt all data encrypted with that key, therefore securely storing DEKs is top priority.

**You should always [separate your plaintext data encryption keys from encrypted data](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html#separation-of-keys-and-data).🔐**

On one side of the security spectrum, there are applications with a single encryption key used to encrypt everything, and pass this key into the application with approaches like environment variables, something like Hashicorp Vault, or storing the key(s) in Amazon S3-compatible stores and restricting access with IAM permissions.

This is easy to manage, since you only worry about securing a single key, but it's extremely dangerous in case you lose it or if someone gets access to it when they shouldn't.

On the other end of the spectrum, you generate a different data encryption key for each piece of data your application wants to encrypt.

This seems much safer, since in the worst case that someone gets ahold of a key they can only decrypt a single piece of data, but management of all these keys sounds like nightmare.

Enter envelope encryption.

## Envelope encryption

In the previous section, we saw that a good approach to reduce risk and blast radius in case someone gets access to a data encryption key (DEK) is to have many of them, one per piece of data.
Securely storing and managing all these DEKs is a concern though.

Envelope encryption introduces another kind of key, the key encryption key (KEK).
The key encryption key (KEK) is used to encrypt the data encryption keys (DEKs).
Once a DEK is encrypted, it can be safely stored together with the encrypted data.

Therefore, we are back at having to manage a single key encryption key while each piece of data is encrypted with its own data encryption key.

**To envelope encrypt some data:**

1. Generate a data encryption key (DEK) using our `GenerateKeyBytes()` function from above.
2. Encrypt our plaintext data with the DEK from step 1, using the `EncryptBytes()` function.
3. Encrypt the DEK itself using a secret key encryption key (KEK), using the `EncryptBytes()` function.
4. Store the data ciphertext from step 2 and the DEK ciphertext from step 3 into our database/datastore.

**To envelope decrypt some data:**

1. Decrypt the data encryption key (DEK) ciphertext first using the key encryption key (KEK), using the `DecryptBytes()` function from above.
2. Decrypt the data ciphertext using the decrypted DEK from step 1, using the `DecryptBytes()` function.

If you have been following along, we solved the problem of managing many data encryption keys (DEKs), but we still need to securely manage the key encryption key.

I have seen many teams storing their key encryption keys in whatever "secret store" their cloud providers provide, since every single platform has a way to store secrets.

This is usually fine, assuming that your provider is properly implementing their "secrets store" with an actual Key Management Service (KMS) under the hood where their employees (or any intruder into their systems) cannot access the actual secret values.

Leaks of "secrets" from different providers is not uncommon though.

We can do better by using a Key Management Service (KMS) to securely store our key encryption keys (KEKs) and handle the encryption/decryption of our data encryption keys (DEKs). That way, the KEKs are never being transmitted in plain text, reducing the risk of them being leaked.

Enter Key Management Services, usually referred to as KMS services.

### Envelope encryption with KMS

Envelope encryption allows us to use different data encryption keys (DEKs) for our data, and encrypt those DEKs with one or a few key encryption keys (KEKs).

The best and recommended way to securely store and manage those key encryption keys (KEKs) is with a dedicated key management service (KMS).

These KMS services encrypt and decrypt data encryption keys without ever exposing the actual key encryption keys in plaintext.
This significantly reduces the risk of leaking our KEKs, since our application doesn't even have access to them.

> We offload trust to the KMS service provider.

Having said that, there is still risk. But, we offload that risk to the cloud provider of our choice. We trust that they implemented these KMS services correctly, and that if any leak or intrusion happens into their own systems our key encryption keys are still secure.

There are a lot of security measures taken by KMS service providers to ensure the key encryption keys are securely protected, and it usually involves keeping the plaintext version of our keys inside Hardware Security Modules (HSM) volatile memory just for the few milliseconds needed for the operation. See [Data protection in AWS Key Management Service](https://docs.aws.amazon.com/kms/latest/developerguide/data-protection.html) for more details.

Most reputable cloud providers offer KMS services, for example [AWS KMS](https://aws.amazon.com/kms/) and [Google Cloud Key Management](https://cloud.google.com/security/products/security-key-management?hl=en).
Many companies also use [Hashicorp Vault](https://www.vaultproject.io/) that allows integration with various KMS services and provides secrets access across the entire infrastrure.

The main API offerred by KMS services that we care about is:

-   EncryptKey
-   DecryptKey
-   GenerateDataKeyPair

Let's examine how we can use a KMS service for envelope encryption.

<figure>
  <img src="/articles-data/2024-12-15-encryption/2024-06-11_article_encryption-symmetric-envelope_encrypt.svg" title="Symmetric envelope encryption with KMS service" alt="Symmetric envelope encryption with KMS service"/>
  <figcaption>Symmetric envelope encryption with KMS service.</figcaption>
</figure>

**To envelope encrypt some data:**

1. Generate a data encryption key (DEK) using our `GenerateKeyBytes()` function from above.
2. Encrypt our plaintext data with the DEK from step 1, using the `EncryptBytes()` function.
3. Encrypt the DEK itself passing the DEK to the KMS `EncryptKey` API.
4. Store the data ciphertext from step 2 and the DEK ciphertext from step 3 into our database/datastore.

<figure>
  <img src="/articles-data/2024-12-15-encryption/2024-06-11_article_encryption-symmetric-envelope_decrypt.svg" title="Symmetric envelope decryption with KMS service" alt="Symmetric envelope decryption with KMS service"/>
  <figcaption>Symmetric envelope decryption with KMS service.</figcaption>
</figure>

**To envelope decrypt some data:**

1. Decrypt the data encryption key (DEK) ciphertext first using the KMS `DecryptKey` API.
2. Decrypt the data ciphertext using the decrypted DEK from step 1 and the `DecryptBytes()` function from above.
3. Return the data plaintext from step 2.

The `GenerateDataKeyPair` API ([see docs](https://docs.aws.amazon.com/kms/latest/developerguide/data-keys.html)) can replace our own `GenerateKeyBytes()` function from above.
Calling this API will return a data encryption key in both plaintext and ciphertext.
We would use the plaintext version to encrypt our data, and store the ciphertext alongside the encrypted data so that we can pass it later to the KMS `DecryptKey` API when we will want to decrypt the data. The plaintext should be discarded immediately after encrypting the data.

### Envelope encryption in Go

The following code is what I use to abstract away any KMS service to allow me to mock them out in local tests, or use any kind of KMS service regardless of the provider.

```go
type KeyEncryptionWrapper interface {
	EncryptKey(ctx context.Context, keyPlain []byte) ([]byte, error)
	DecryptKey(ctx context.Context, keyCipher []byte) ([]byte, error)
}

type Enveloped struct {
	kms KeyEncryptionWrapper
}

func NewEnveloped(kms KeyEncryptionWrapper) *Enveloped {
	return &Enveloped{
		kms: kms,
	}
}
```

Now let's see the encrypt/decrypt methods of the `Enveloped` abstraction.

```go
// Encrypt encrypts the given data and returns Base64 formatted cipher data blob
// that needs to be passed to the `Decrypt()` function for decrypting.
func (e *Enveloped) Encrypt(ctx context.Context, data []byte) (string, error) {
	var err error
	dekKey := GenerateKeyBytes()
	dekCipher, err := e.kms.EncryptKey(ctx, dekKey)
	if err != nil {
		return "", fmt.Errorf("could not encrypt data key: %w", err)
	}

	cipherData, err := EncryptBytes(dekKey, data)
	if err != nil {
		return "", fmt.Errorf("could not encrypt data: %w", err)
	}

	return fmt.Sprintf(
		"%s.%s",
		ToBase64(dekCipher),
		ToBase64(cipherData),
	), nil
}

// Decrypt extracts the necessary key information from the cipherDataBlob, decrypts the data
// and returns the decrypted plain bytes.
func (e *Enveloped) Decrypt(ctx context.Context, cipherDataBlob string) ([]byte, error) {
	var err error
	partsDot := strings.SplitN(cipherDataBlob, ".", 3)
	if len(partsDot) != 2 {
		return nil, fmt.Errorf("invalid cipher data blob")
	}
	dekCipher, dataCipher := fromBase64(partsDot[0]), fromBase64(partsDot[1])
	if dekCipher == nil || dataCipher == nil {
		return nil, fmt.Errorf("invalid cipher data blob")
	}

	dekKey, err := e.kms.DecryptKey(ctx, dekCipher)
	if err != nil {
		return nil, fmt.Errorf("could not decrypt data encryption key: %w", err)
	}

	plainData, err := DecryptBytes(
		dekKey,
		dataCipher,
	)
	if err != nil {
		return nil, fmt.Errorf("could not decrypt data: %w", err)
	}

	return plainData, nil
}
```

Note that I use a Base64 encoded string as the encryption result to make it more readable and universally compatible with any storage product, and it also makes the decrypting a bit simpler.
That's an optional step, and alternatively I could just return two byte slices directly, one for the DEK ciphertext and one for the data ciphertext.

## Key rotation

We haven't discussed anything about key rotation so far, but it's a key component in keeping your data safe.

Key rotation is the re-encryption of data with a different data encryption key (DEK).

1. Retrieve the data encryption key (DEK) for some data.
2. Decrypt the data ciphertext using the DEK from step 1.
3. Generate a new data encryption key (DEK-2).
4. Encrypt the data using DEK-2.
5. Store data ciphertext from step 4.

Key rotation is important in order to reduce the risk of a key being leaked or being discovered impacting much of your encrypted data.

Even if an attacker gets ahold of a data encryption key (DEK) plaintext, they will only be able to decrypt data that used that specific DEK.
Therefore, rotating the encryption keys makes this attack impossible.

Even though key rotation is nice, it becomes very hard and gets very costly if we had to re-encrypt the entirety of our dataset.
Imagine Google wanting to re-encrypt the Google Drive files across all their customers, or Amazon S3, or Cloudflare R2.
You get the idea. It's not trivial or practically feasible to re-encrypt petabytes of data every day.

Envelope encryption helps here again.👌

Since we have separate DEKs for each piece of data, we can do re-encryption only for the DEK itself which is stored alongside the encrypted data.
The encryption keys are a few bytes (32-bytes in our code above), therefore much more practical to re-encrypt across the board.

KMS services offer [key rotation APIs](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) to simplify the key rotation process, and you can even have multiple key encryption keys eligible for decrypting a data encryption key so that you can carry out key rotation over several days or weeks.

## Multi-level envelope encryption

The vast majority of users should use envelope encryption with a KMS service and everything will work out fine.

In some cases, when you need to manage a lot of key encryption keys, you might want to apply envelope encryption multiple times.

For example, AWS uses multiple levels of hierarchical envelope encryption. They generate an account level key encryption key used to encrypt key encryption keys for each service in that account (e.g. S3). Then, that service key encryption key is used to encrypt data encryption keys to encrypt data stored by the service.

As another example, in [<span class="skybear-name">Skybear<span>.NET</span></span>](https://www.skybear.net) I generate one account-level key encryption key (AKEK) that is encrypted/decrypted by AWS KMS, and then that AKEK is used to encrypt/decrypt the individual data encryption keys for each piece of data encrypted for that account.

The main reason to do this approach is to reduce the amount of KMS API calls, either due to cost reasons or due to KMS API rate limits.

Keeping the intermediate key encryption keys in memory for a few seconds or minutes could be very beneficial in some cases.
But, unless you really need this optimization, stay with the simple KMS-based envelope encryption and avoid complexity.

## Conclusion

If you have read till here, thank you!🙏🏼

To summarize:

-   Encrypt your data, encrypt your users' data, encrypt everything.
-   Follow security guidelines, use secure algorithms and correct implementations of those algorithms. Use Go more😉
-   Use KMS services to offload encryption key management.
