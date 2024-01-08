import Head from 'next/head'
import {Layout} from "../components/layout";
import { Aex } from "../components/common"

function IconDefs() {
  return <svg style={{display: "none"}} viewBox="0 0 0 0" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <defs>
      <path id="iconHeart" d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
      <path id="iconChainLink" d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825"></path>
      <path id="iconAudio" d="M17.969,10c0,1.707-0.5,3.366-1.446,4.802c-0.076,0.115-0.203,0.179-0.333,0.179c-0.075,0-0.151-0.022-0.219-0.065c-0.184-0.122-0.233-0.369-0.113-0.553c0.86-1.302,1.314-2.812,1.314-4.362s-0.454-3.058-1.314-4.363c-0.12-0.183-0.07-0.43,0.113-0.552c0.186-0.12,0.432-0.07,0.552,0.114C17.469,6.633,17.969,8.293,17.969,10 M15.938,10c0,1.165-0.305,2.319-0.88,3.339c-0.074,0.129-0.21,0.201-0.347,0.201c-0.068,0-0.134-0.016-0.197-0.052c-0.191-0.107-0.259-0.351-0.149-0.542c0.508-0.9,0.776-1.918,0.776-2.946c0-1.028-0.269-2.046-0.776-2.946c-0.109-0.191-0.042-0.434,0.149-0.542c0.193-0.109,0.436-0.042,0.544,0.149C15.634,7.681,15.938,8.834,15.938,10 M13.91,10c0,0.629-0.119,1.237-0.354,1.811c-0.063,0.153-0.211,0.247-0.368,0.247c-0.05,0-0.102-0.01-0.151-0.029c-0.203-0.084-0.301-0.317-0.217-0.521c0.194-0.476,0.294-0.984,0.294-1.508s-0.1-1.032-0.294-1.508c-0.084-0.203,0.014-0.437,0.217-0.52c0.203-0.084,0.437,0.014,0.52,0.217C13.791,8.763,13.91,9.373,13.91,10 M11.594,3.227v13.546c0,0.161-0.098,0.307-0.245,0.368c-0.05,0.021-0.102,0.03-0.153,0.03c-0.104,0-0.205-0.04-0.281-0.117l-3.669-3.668H2.43c-0.219,0-0.398-0.18-0.398-0.398V7.012c0-0.219,0.179-0.398,0.398-0.398h4.815l3.669-3.668c0.114-0.115,0.285-0.149,0.435-0.087C11.496,2.92,11.594,3.065,11.594,3.227 M7.012,7.41H2.828v5.18h4.184V7.41z M10.797,4.189L7.809,7.177v5.646l2.988,2.988V4.189z"></path>
      <path id="iconVideo" d="M17.919,4.633l-3.833,2.48V6.371c0-1-0.815-1.815-1.816-1.815H3.191c-1.001,0-1.816,0.814-1.816,1.815v7.261c0,1.001,0.815,1.815,1.816,1.815h9.079c1.001,0,1.816-0.814,1.816-1.815v-0.739l3.833,2.478c0.428,0.226,0.706-0.157,0.706-0.377V5.01C18.625,4.787,18.374,4.378,17.919,4.633 M13.178,13.632c0,0.501-0.406,0.907-0.908,0.907H3.191c-0.501,0-0.908-0.406-0.908-0.907V6.371c0-0.501,0.407-0.907,0.908-0.907h9.079c0.502,0,0.908,0.406,0.908,0.907V13.632zM17.717,14.158l-3.631-2.348V8.193l3.631-2.348V14.158z"></path>
      <path id="iconBook" d="M8.627,7.885C8.499,8.388,7.873,8.101,8.13,8.177L4.12,7.143c-0.218-0.057-0.351-0.28-0.293-0.498c0.057-0.218,0.279-0.351,0.497-0.294l4.011,1.037C8.552,7.444,8.685,7.667,8.627,7.885 M8.334,10.123L4.323,9.086C4.105,9.031,3.883,9.162,3.826,9.38C3.769,9.598,3.901,9.82,4.12,9.877l4.01,1.037c-0.262-0.062,0.373,0.192,0.497-0.294C8.685,10.401,8.552,10.18,8.334,10.123 M7.131,12.507L4.323,11.78c-0.218-0.057-0.44,0.076-0.497,0.295c-0.057,0.218,0.075,0.439,0.293,0.495l2.809,0.726c-0.265-0.062,0.37,0.193,0.495-0.293C7.48,12.784,7.35,12.562,7.131,12.507M18.159,3.677v10.701c0,0.186-0.126,0.348-0.306,0.393l-7.755,1.948c-0.07,0.016-0.134,0.016-0.204,0l-7.748-1.948c-0.179-0.045-0.306-0.207-0.306-0.393V3.677c0-0.267,0.249-0.461,0.509-0.396l7.646,1.921l7.654-1.921C17.91,3.216,18.159,3.41,18.159,3.677 M9.589,5.939L2.656,4.203v9.857l6.933,1.737V5.939z M17.344,4.203l-6.939,1.736v9.859l6.939-1.737V4.203z M16.168,6.645c-0.058-0.218-0.279-0.351-0.498-0.294l-4.011,1.037c-0.218,0.057-0.351,0.28-0.293,0.498c0.128,0.503,0.755,0.216,0.498,0.292l4.009-1.034C16.092,7.085,16.225,6.863,16.168,6.645 M16.168,9.38c-0.058-0.218-0.279-0.349-0.498-0.294l-4.011,1.036c-0.218,0.057-0.351,0.279-0.293,0.498c0.124,0.486,0.759,0.232,0.498,0.294l4.009-1.037C16.092,9.82,16.225,9.598,16.168,9.38 M14.963,12.385c-0.055-0.219-0.276-0.35-0.495-0.294l-2.809,0.726c-0.218,0.056-0.351,0.279-0.293,0.496c0.127,0.506,0.755,0.218,0.498,0.293l2.807-0.723C14.89,12.825,15.021,12.603,14.963,12.385"></path>
    </defs>
  </svg>;
}

function Icon({type, className = ""}) {
  // From http://svgicons.sparkk.fr/
  switch (type) {
  case "favourite":
    return <svg className={`favourite ${className}`} viewBox="0 0 20 20"><use xlinkHref="#iconHeart"/></svg>;
  case "chain-link":
    return <svg className={`${className}`} viewBox="0 0 20 20"><use xlinkHref="#iconChainLink"/></svg>;
  case "audio":
    return <svg className={`${className}`} viewBox="0 0 20 20"><use xlinkHref="#iconAudio"/></svg>;
  case "video":
    return <svg className={`${className}`} viewBox="0 0 20 20"><use xlinkHref="#iconVideo"/></svg>;
  default:
    return <svg className={`${className}`} viewBox="0 0 20 20"><use xlinkHref="#iconBook"/></svg>;
  }
}

const toId = (s) => {
  const regex = /[^a-z0-9-_]/gi;
  return s.replace(regex, "-").toLowerCase();
}

function WhiskyImage({ title, url }) {
  return (
    <figure>
      <Aex href={url}><img src={url} title={title} alt={title} /></Aex>
      <figcaption><strong>{title}</strong><br/>(click image to view full-size)</figcaption>
    </figure>)
}

function WhiskyNight({ title, children }) {
  return (<section className="whisky-night-section" id={toId(title)}>
    <h3><a href={`#${toId(title)}`}>{title}</a></h3>
    {children}
  </section>)
}

function WhiskyNights({}) {
  return (
    <article id="whisky-nights">
      <h2>Whisky Nights <a className="chain-link" href="#whisky-nights"><Icon type="chain-link"/></a></h2>
      <p>This section is dedicated to the whisky nights we organize.</p>

      <WhiskyNight title="Whisky Night #1">
        <WhiskyImage url="/s/images/whisky/whisky_night_1.jpg" title="WhistlePig 10 - Small Batch Rye Whisky" />
      </WhiskyNight>
      <WhiskyNight title="Whisky Night #2">
        <WhiskyImage url="/s/images/whisky/whisky_night_2.jpeg" title="Octomore 11.1 - Super Heavily Peated Islay Single Malt Whisky" />
      </WhiskyNight>
      <WhiskyNight title="Whisky Night #3">
        <WhiskyImage url="/s/images/whisky/whisky_night_3.jpeg" title="Dun Bheagan - Single Malt Scotch Whisky" />
      </WhiskyNight>
      <WhiskyNight title="Whisky Night #4">
        <WhiskyImage url="/s/images/whisky/whisky_night_4.jpeg" title="Macallan Quest (left), Jura 21 (right) - Single Malt Scotch Whisky" />
      </WhiskyNight>
      <WhiskyNight title="Whisky Night #5">
        <WhiskyImage url="/s/images/whisky/whisky_night_5.jpeg" title="The Yamazaki 12 - Single Malt Japanese Whisky" />
      </WhiskyNight>
      <WhiskyNight title="Whisky Night #6">
        <WhiskyImage url="/s/images/whisky/whisky_night_6.jpeg" title="Aberlour 12 (left), Aberlour A'Bunadh (right) - Speyside Single Malt Scotch Whisky" />
      </WhiskyNight>
      <WhiskyNight title="Whisky Night #7">
        <WhiskyImage url="/s/images/whisky/whisky_night_7.jpeg" title="Highland Park Dark Origins (left), Oban Little Bay (right) - Single Malt Scotch Whisky" />
      </WhiskyNight>
      <WhiskyNight title="Whisky Night #8">
        <WhiskyImage url="/s/images/whisky/whisky_night_8.jpeg" title="Mortlach 16 (left), Glenfarclas 15 (right) - Single Malt Scotch Whisky" />
      </WhiskyNight>
      <WhiskyNight title="Whisky Night #9">
        <WhiskyImage url="/s/images/whisky/whisky_night_9.jpeg" title="Glen Garioch 12 (left), Kilchoman 100% Islay 12th Limited Edition (right) - Single Malt Scotch Whisky" />
      </WhiskyNight>
      <WhiskyNight title="Whisky Night #10">
        <WhiskyImage url="/s/images/whisky/whisky_night_10.jpeg" title="Angels Envy (left) - Kentucky Straight Burbon Whisky, Koval Rye (right) - Single Barrel Whisky" />
      </WhiskyNight>
      <WhiskyNight title="Whisky Night #11">
        <WhiskyImage url="/s/images/whisky/whisky_night_11-1.jpeg" title="Caol Ila Signatory Vintage 12 (left) - Islay Single Malt Scotch Whisky, Silent Pool (right) - Gin" />
        <WhiskyImage url="/s/images/whisky/whisky_night_11-2.jpeg" title="Ledaig 10 - Single Malt Scotch Whisky" />
      </WhiskyNight>
      <WhiskyNight title="Whisky Night #12">
        <WhiskyImage url="/s/images/whisky/whisky_night_12.jpeg" title="Deanston 18 - Highland Single Malt Scotch Whisky" />
      </WhiskyNight>
      <WhiskyNight title="Whisky Night #13">
        <WhiskyImage url="/s/images/whisky/whisky_night_13.jpeg" title="Smokehead Rum Cask Rebel (left), Smokehead Unfiltered (middle), Smokehead High Voltage (right) - Islay Single Malt Scotch Whisky" />
      </WhiskyNight>
    </article>
  )
}

function RatedWhisky({ children, id, rating }) {
  return (
    <section className="rated-whisky" id={id}>
      <p className="rating">Rating: <span>{rating}/5</span> <a className="chain-link" href={`#${id}`}><Icon type="chain-link"/></a></p>
      {children}
    </section>
  )
}

function RatedWhiskies({}) {
  return (
    <article id="rated-whiskies">
      <h2>Rated Whiskies <a className="chain-link" href="#rated-whiskies"><Icon type="chain-link"/></a></h2>
      <p>This section contains whiskies I tried at the <Aex href="http://blackrock.bar/" title="BlackRock bar website">BlackRock bar</Aex>, or elsewhere and are worthy of mentioning. They are rated to a scale of 5, with 5 being the best, at least for my taste.</p>
      
      <hr />

      <RatedWhisky rating={4} id="whisky-smokehead-unfiltered">
        <WhiskyImage url="/s/images/whisky/blackrock_20231101_smokehead.jpg" title="Smokehead Unfiltered - Islay Single Malt Scotch Whisky" />
      </RatedWhisky>
      <hr />
      <RatedWhisky rating={4.5} id="whisky-lagg">
        <WhiskyImage url="/s/images/whisky/blackrock_20231101_lagg.jpg" title="Lagg Kilmory Edition - Single Malt Scotch Whisky" />
      </RatedWhisky>
      <hr />
      <RatedWhisky rating={4} id="whisky-port-askaig-cask-strength">
        <WhiskyImage url="/s/images/whisky/blackrock_20231101_port-askaig.jpg" title="Port Askaig Cask Strength - Islay Single Malt Scotch Whisky" />
      </RatedWhisky>
      <hr />
      <RatedWhisky rating={4.5} id="whisky-the-clenturret">
        <WhiskyImage url="/s/images/whisky/blackrock_20231101_the-clenturret.jpg" title="The Clenturret 10 Peat Smoked - Highland Single Malt Scotch Whisky" />
      </RatedWhisky>
      <hr />
      <RatedWhisky rating={5} id="whisky-octomore-14_1">
        <WhiskyImage url="/s/images/whisky/20231104_octomore-14_1.jpg" title="Octomore 14.1 Super Heavily Peated - Islay Single Malt Scotch Whisky" />
      </RatedWhisky>
      
    </article>
  );
}

export default function Page({}) {
  const title = "Whisky | Lambros Petrou";
  const desc = "Lambros' curated list of whisky related material to read, watch, listen, and most importantly drink.";

  return (
    <Layout>
      <Head>
        <link rel="canonical" href="https://www.lambrospetrou.com/whisky/" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc}/>
        <meta name="description" content={desc}/>
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/s/images/whisky/og_image.jpg" />
      </Head>

      <IconDefs />

      <div id="page-whisky">
        <h1>Whisky 🥃</h1>

        <WhiskyNights />
        <RatedWhiskies />
      </div>

    </Layout>
  );
};
