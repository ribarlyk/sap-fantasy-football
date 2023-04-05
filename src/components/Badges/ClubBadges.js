import "./ClubBadges.css"
import Badge from "./Badge"
import link from "../../assets/images/link.png"
import liverpool from "../../assets/images/t14.png"
import afcb from "../../assets/images/t91.png"
import arsenal from "../../assets/images/t3.png"
import avfc from "../../assets/images/t7.png"
import brentford from "../../assets/images/t94.png"
import brightonandhovealbion from "../../assets/images/t36.png"
import chelseafc from "../../assets/images/t8.png"
import cpfc from "../../assets/images/t31.png"
import evertonfc from "../../assets/images/t11.png"
import leedsunited from "../../assets/images/t2.png"
import fulhamfc from "../../assets/images/t54.png"
import lcfc from "../../assets/images/t13.png"
import mancity from "../../assets/images/t43.png"
import manutd from "../../assets/images/t1.png"
import nufc from "../../assets/images/t4.png"
import nottinghamforest from "../../assets/images/t17.png"
import southamptonfc from "../../assets/images/t20.png"
import tottenhamhotspur from "../../assets/images/t6.png"
import whufc from "../../assets/images/t21.png"
import wolves from "../../assets/images/t39.png"
export default function ClubBadges() {
    return (
        <nav className="club-navigation">
            <div className="clubSites"><h5>CLUB SITES <img width="10px" height="10px" src={link} alt="" /></h5></div>
            <ul className="club-list">                                                                                                                          
                <Badge teamSite={"https://www.liverpoolfc.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={liverpool} />
                <Badge teamSite={"https://www.afcb.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={afcb} />
                <Badge teamSite={"https://www.arsenal.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={arsenal} />
                <Badge teamSite={"https://www.avfc.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={avfc} />
                <Badge teamSite={"https://www.brentfordfc.com/en??utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={brentford} />
                <Badge teamSite={"https://www.brightonandhovealbion.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={brightonandhovealbion} />
                <Badge teamSite={"https://www.chelseafc.com/en??utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={chelseafc} />
                <Badge teamSite={"https://www.cpfc.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={cpfc} />
                <Badge teamSite={"https://www.evertonfc.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={evertonfc} />
                <Badge teamSite={"https://www.leedsunited.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={leedsunited} />
                <Badge teamSite={"https://www.fulhamfc.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={fulhamfc} />
                <Badge teamSite={"https://www.lcfc.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link&lang=en"} bagdeSrc={lcfc} />
                <Badge teamSite={"https://www.mancity.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={mancity} />
                <Badge teamSite={"https://www.manutd.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={manutd} />
                <Badge teamSite={"https://www.nufc.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={nufc} />
                <Badge teamSite={"https://www.nottinghamforest.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={nottinghamforest} />
                <Badge teamSite={"https://www.southamptonfc.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={southamptonfc} />
                <Badge teamSite={"https://www.tottenhamhotspur.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={tottenhamhotspur} />
                <Badge teamSite={"https://www.whufc.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={whufc} />
                <Badge teamSite={"https://www.wolves.co.uk/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link"} bagdeSrc={wolves} />
            </ul>
        </nav>
    )
}