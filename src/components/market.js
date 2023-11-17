"use client"

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/market.module.css"

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Market({ currencyId, time }) {
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chartProps, setChartProps] = useState({});
    const marketSocket = useRef(null);

    const getInitialMarket = async () => {
        await fetch(`https://www.okx.com/api/v5/market/history-index-candles?instId=${currencyId}T&bar=${time}`)
            .then((response) => response.json())
            .then((json) => {
                const jsonData = json.data;
                const dummyMarkets = []
                jsonData.forEach((value) => {
                    dummyMarkets.push({ x: new Date(parseInt(value[0])), y: [value[1], value[2], value[3], value[4]] })
                })
                (dummyMarkets)
                setMarkets(dummyMarkets);
            })
        setLoading(false)
    }

    const handleGraph = (data) => {
        const props = {
            series: [{
                data: data
            }],
            options: {
                chart: {
                    type: 'candlestick',
                    toolbar: {
                        show: true
                    }
                },
                title: {
                    text: undefined
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                }
            },
        };

        setChartProps(props);
    }

    const socketInitializer = async () => {

        const marketParams = `{
      "op": "subscribe",
      "args": [
        {
          "channel": "index-candle${time}",
          "instId": "${currencyId}T"
        }
      ]
    }
    `

        marketSocket.current = new WebSocket("wss://ws.okx.com:8443/ws/v5/business")

        marketSocket.current.onopen = () => {
            ("market open");
            marketSocket.current.send(marketParams);
        };


        marketSocket.current.onclose = () => {
            ("market closed");
        }
    }

    useEffect(() => {
        getInitialMarket()
        socketInitializer();
        return () => {
            marketSocket.current.close()
        };
    }, []);

    useEffect(() => {
        if (marketSocket.current) {
            marketSocket.current.onmessage = (event) => {
                const json = JSON.parse(event.data);
                if (json.data) {
                    const jsonData = json.data[0];

                    // Only get when it is completed
                    if (jsonData[5] === "1") {
                        const market = { x: new Date(parseInt(jsonData[0])), y: [jsonData[1], jsonData[2], jsonData[3], jsonData[4]] }
                        setMarkets((prevMarket) => {
                            const newMarket = [...prevMarket];
                            newMarket.pop();
                            return [market, ...newMarket];
                        })
                    }
                }
            }

        }
        handleGraph(markets)
    }, [markets]);

    return loading ?
        (
            <div>
                Loading
            </div>)
        :
        (
            <main>
                <div className={styles.container}>
                    <h2>Chart</h2>
                    <div className={styles.chartContainer} id="chart">
                        <ApexChart type="candlestick" options={chartProps.options} series={chartProps.series} height={400} width={"100%"} />

                    </div>
                </div>

            </main>
        )
}
