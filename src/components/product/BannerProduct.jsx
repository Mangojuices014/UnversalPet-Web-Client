import React from 'react'
import { Link } from 'react-router-dom'

const BannerProduct = () => {
  return (
    <section className="name__brand  ">
        <div className="showtotop" style="font-size: 50px; font-weight: 900; color:#fff ;background: transparent">
            Specialties</div>
        <ul className="breadcrumb">
            <li className="breadcrumb__item"><Link to="/">Universal Pet Care</Link> <i
                    className="fa-solid fa-chevron-right"></i> </li>
            <li className="breadcrumb__item">Product<i className="fa-solid fa-chevron-right"></i></li>
        </ul>
    </section>
  )
}

export default BannerProduct