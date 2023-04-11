import "./ClubBadges.scss"

export default function Badge({ teamSite, bagdeSrc }) {

    return (
        <li>
            <a href={teamSite} target="_blank">
                <div className="badge">
                    <img src={bagdeSrc} alt="" />
                </div>
            </a>
        </li>
    )
}


