"use client"

import React, { useEffect, useRef, useState } from "react";

export default function Book({ currencyId }) {
    const [asks, setAsks] = useState([]);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const booksSocket = useRef(null);

    const getInitialOrderBook = async () => {
        await fetch(`https://www.okx.com/api/v5/market/books?instId=${currencyId}T&sz=10`).then((response) => response.json())
            .then((json) => {
                const dummyOrderBook = json.data[0];
                let dummyAsks = []
                let dummyBids = []
                dummyOrderBook.asks.forEach((element, index) => {
                    const ask = [element[0], element[1]]
                    const bid = [dummyOrderBook.bids[index][0], dummyOrderBook.bids[index][1]]
                    dummyAsks.push(ask)
                    dummyBids.push(bid)
                })
                setAsks(dummyAsks)
                setBids(dummyBids)
            })
        setLoading(false)
    }

    const socketInitializer = async () => {

        const bookParams = `{
      "op": "subscribe",
      "args": [
        {
          "channel": "bbo-tbt",
          "instId": "${currencyId}T"
        }
      ]
    }
    `

        booksSocket.current = new WebSocket("wss://ws.okx.com:8443/ws/v5/public")

        booksSocket.current.onopen = () => {
            console.log("book open")
            booksSocket.current.send(bookParams);
        };

        booksSocket.current.onclose = () => {
            console.log("book closed");
        }


    }

    useEffect(() => {
        getInitialOrderBook();
        socketInitializer();
        return () => {
            booksSocket.current.close()
        };
    }, []);

    useEffect(() => {
        booksSocket.current.onmessage = (event) => {
            const json = JSON.parse(event.data);
            if (json.data) {
                const dummyAsk = [json.data[0].asks[0][0], json.data[0].asks[0][1]];
                const dummyBid = [json.data[0].bids[0][0], json.data[0].bids[0][1]];

                asks.pop()
                bids.pop()
                setAsks((prevState) => ([dummyAsk, ...prevState]))
                setBids((prevState) => ([dummyBid, ...prevState]))
                console.log(asks)
                console.log(bids)
            }
        }
    }, [asks, bids]);

    return loading ?
        (
            <div>
                Loading
            </div>)
        :
        (
            <main>
                <div>
                    <h1>Order Book</h1>
                </div>
                <div>
                    {asks.map((ask, index) => {
                        const bid = bids[index]
                        return (
                            <div key={index}>
                                <p>
                                    asks: {ask[0]} volume: {ask[1]}
                                </p>
                                <p>
                                    bids: {bid[0]} volume: {bid[1]}
                                </p>
                            </div>
                        )
                    })}

                </div>
            </main>
        )
}
