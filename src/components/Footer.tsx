import React from "react";
import styles from  "./Footer.module.css";

export default function Footer(){
    return(
        <footer className={styles.footer}>
        <div className={styles['footer-left']}>
            <p><strong>JCSE</strong></p>
            <p>JH_Journal</p>
            <div className={styles.socials}>
                <a href="#"><i className="fa-brands fa-twitter"></i></a>
                <a href="#"><i className="fa-brands fa-facebook"></i></a>
                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
        </div>

        <ul className={styles['footer-right']}>
            <li>
                <h3><strong>Quick Links</strong></h3>

                <ul className={styles.box}>
                    <li><a href="">Home</a></li> 
                    <li><a href="">FAQ's</a></li>
                    <li><a href="">Site map</a></li>
                    <li><a href="">Terms & Conditions</a></li>
                </ul>
            </li>
            <li>
                <h3><strong> Journal Contents</strong></h3>
                <ul className={styles.box}>
                    <li><a href="">Current Issue</a></li>
                    <li><a href="">Archive Issues</a></li>
                    <li><a href="">Special Issues</a></li>
                    <li><a href="">Best Paper Awards</a></li>
                    <li><a href="">Regular Publication e-Certificate</a></li>
                    <li><a href="">Special Publication e-Certificate</a></li>
                </ul>
            </li>
            <li>
                <h3><strong>Downloads</strong></h3>
                <ul className={styles.box}>
                    <li><a href="">Template</a></li>
                    <li><a href="">Copyright Form</a></li>
                    <li><a href="">Originality Certificate</a></li>
                </ul>
            </li>
            <li>
                <h3><strong>Subscription Fee</strong></h3>
                <ul className={styles.box}>
                    <li><a href="">Subscription Fee</a></li>
                </ul>
            </li>
            <li>
                <h3><strong>Author Guidelines</strong></h3>
                <ul className={styles.box}>
                    <li><a href="">Reviewer Guidelines</a></li>
                    <li><a href="">Peer Review Process</a></li>
                    <li><a href="">Ethics & Malpractice</a></li>
                    <li><a href=""> Research Areas</a></li>
                    <li><a href=""> Correction Policy</a></li>
                    <li><a href=""> Plagiarism Policy</a></li>
                </ul>
            </li>
        </ul>
        <div className={styles['footer-bottom']}>
            <p>All Right Reserved by &copy;2023</p>
        </div>   
    </footer>
    )
}