---
title: "How to find listening and open ports in Linux"
description: "A simple way to list the local network ports and their state."
---

In many cases I want to check information about the network ports on my system, either to see what is using a specific port, or to see which ports are listening for requests.

## Option 1 - lsof

```sh
lsof -nP +c 15 | grep LISTEN
```

The command `lsof` stands for "list open files". It provides information about files and processes that are currently open on the system.

The following options to `lsof` make the command faster by avoiding DNS and service lookups. 
- `-n` prevents the conversion of network numbers to hostnames.
- `-P` prevents the conversion of port numbers to service names.

The option `+c 15` specifies the number of seconds to wait before giving up on network-related operations.

The `| grep LISTEN` pipe command filters the output of `lsof` for lines containing the word `LISTEN`, which indicates processes that are listening for incoming network connections.

## Option 2 - netstat

```sh
netstat -tuln
```

The command `netstat` stands for "network statistics". It provides information about network connections, routing tables, interface statistics, masquerade connections, and multicast memberships.

The command `netstat -tuln` is used to display information about active network connections and listening sockets.

The options `-tuln` to `netstat` mean:
- `-t` specifies that only TCP connections should be displayed. It filters the output to show only information related to TCP protocols.
- `-u` specifies that only UDP connections should be displayed. Similar to the `-t` option, it filters the output to show only information related to UDP protocols.
- `-l` stands for "listening" and instructs netstat to display only listening sockets, which are endpoints for incoming connections.
- `-n` prevents the conversion of numeric addresses to symbolic hostnames. It speeds up the command execution by avoiding DNS lookups.

Appending the `| grep http` pipe command filters the output of `netstat` for lines containing the word `http`, which indicates processes that are listening for incoming HTTP connections.

References
- https://www.redhat.com/sysadmin/netstat
