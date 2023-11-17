## Trading-Websocket

This project is about gathering candlestick graph and order book of certain cryptocurrency with the use of Websocket. Currently it only offers BTC (Bitcoin), ETH (Ethereum), and ADA (Cardano). However it can easily be added by adding the crypto and the currency within this line: 

```
// Within src/app/page.js

const listOfCurrency = ["BTC-USD", "ETH-USD", "ADA-USD"];
```

The format for the currency is based on https://www.okx.com/.

## Websockets

Websockets are used to communicate between the client and OKX Websocket API in realtime.

The use for the Websocket in this project is to gather candlestick and order book for a cryptocurrency.

Here is the [link](https://www.okx.com/docs-v5/en/#overview) to the documentation.

## REST API

The regular REST API is still used to gather information for the initialization for both the candlestick graph and order book

This project still uses OKX's REST API to gather the history for the candlestick and order book

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

### Framework
Next.js in Javascript

### API
Huge thanks for OKX and its availability for the API. OKX gives public API for its Websocket and REST API making development easier. Since all of the API calls are all from OKX's public channel, no registration is requried.

[OKX API Documentation](https://www.okx.com/docs-v5/en/#overview)

### Libraries
This project uses some third party libraries. Below are the libraries used for this project and its reason why this project uses them:

- Apexcharts - Candlestick graph
- Bootstrap - CSS Framework in order to make a responsive page easier