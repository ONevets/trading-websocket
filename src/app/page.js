"use client"

import React, { useEffect, useState } from "react";
import Market from "@/components/market";
import Book from "@/components/book";
import { Dropdown, Container, Row, Col, DropdownButton } from 'react-bootstrap';
import styles from "@/styles/home.module.css"

const listOfCurrency = ["BTC-USD", "ETH-USD", "ADA-USD"];
const listOfTimes = ["1W", "1D", "4H", "1H", "15m", "5m", "1m"];

export default function Home() {
  const [currencyId, setCurrencyId] = useState("BTC-USD");
  const [time, setTime] = useState("1m")
  const [loading, setLoading] = useState(true);

  const handleCurrency = (e) => {
    setCurrencyId(e);
    setLoading(true)
  }

  const handleTime = (e) => {
    setTime(e);
    setLoading(true)
  }

  useEffect(() => {
    setLoading(false)
  }, [currencyId, time]);

  return loading ?
    (
      <div>
        Loading
      </div>)
    :
    (
      <main>

        <div>
          <div>
            <h1>{currencyId}</h1>
            <div className={styles.dropdown}>
              <DropdownButton variant="secondary" title={currencyId} onSelect={(e) => {
                setLoading(true)
                handleCurrency(e)
              }}>

                {listOfCurrency.map((value, index) => {
                  return value === currencyId ? (
                    <div key={index}>
                      <Dropdown.Item disabled key={index} eventKey={value}>{value}</Dropdown.Item>
                    </div>
                  ) : (
                    <div key={index}>
                      <Dropdown.Item key={index} eventKey={value}>{value}</Dropdown.Item>
                    </div>
                  )
                })}

              </DropdownButton>
            </div>

            <div className={styles.dropdown}>
              <DropdownButton variant="secondary" title={time} onSelect={(e) => {
                setLoading(true)
                handleTime(e)
              }}>
                {listOfTimes.map((value, index) => {
                  return value === time ? (
                    <div key={index}>
                      <Dropdown.Item disabled key={index} eventKey={value}>{value}</Dropdown.Item>
                    </div>
                  ) : (
                    <div key={index}>
                      <Dropdown.Item key={index} eventKey={value}>{value}</Dropdown.Item>
                    </div>
                  )
                })}
              </DropdownButton>
            </div>
            <Market currencyId={currencyId} time={time}></Market>
          </div>
          <div>
            <h2 className={styles.orderBookTitle}>Order Book</h2>
            <Book currencyId={currencyId}></Book>
          </div>

        </div>
      </main>
    )
}
