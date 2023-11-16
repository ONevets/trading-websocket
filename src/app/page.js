"use client"

import React, { useEffect, useState } from "react";
import Market from "@/components/market";
import Book from "@/components/book";
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown } from 'react-bootstrap';

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
        <div className="dropdown">
          <Dropdown onSelect={(e) => {
            setLoading(true)
            handleCurrency(e)
          }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {currencyId}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="BTC-USD">BTC-USD</Dropdown.Item>
              <Dropdown.Item eventKey="ETH-USD">ETH-USD</Dropdown.Item>
              <Dropdown.Item eventKey="ADA-USD">ADA-USD</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="dropdown">
          <Dropdown onSelect={(e) => {
            setLoading(true)
            handleTime(e)
          }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {time}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="1W">1W</Dropdown.Item>
              <Dropdown.Item eventKey="1D">1D</Dropdown.Item>
              <Dropdown.Item eventKey="4H">4H</Dropdown.Item>
              <Dropdown.Item eventKey="1H">1H</Dropdown.Item>
              <Dropdown.Item eventKey="15m">15m</Dropdown.Item>
              <Dropdown.Item eventKey="5m">5m</Dropdown.Item>
              <Dropdown.Item eventKey="1m">1m</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <Market currencyId={currencyId} time={time}></Market>
          <Book currencyId={currencyId} time={time}></Book>
        </div>
      </main>
    )
}
