"use client"

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/book.module.css"

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
            ("book open")
            booksSocket.current.send(bookParams);
        };

        booksSocket.current.onclose = () => {
            ("book closed");
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
                setAsks((prevAsks) => {
                    const newAsks = [...prevAsks];
                    newAsks.pop();
                    return [dummyAsk, ...newAsks];
                })

                setBids((prevBids) => {
                    const newBids = [...prevBids];
                    newBids.pop();
                    return [dummyBid, ...newBids];
                })
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
                <div className={styles.background}>
                    {asks.map((ask, index) => {
                        const bid = bids[index]
                        return (
                            <div className={styles.container} key={index}>
                                <div className={styles.bid}>
                                    <p>
                                        Bid: {bid[0]} Volume: {bid[1]}
                                    </p>
                                </div>

                                <div className={styles.ask}>
                                    <p>
                                        Ask: {ask[0]} Volume: {ask[1]}
                                    </p>
                                </div>

                            </div>
                        )
                    })}

                </div>
            </main>
        )
}
