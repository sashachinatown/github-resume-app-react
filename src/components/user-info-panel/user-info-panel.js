import './user-info-panel.css';

const UserInfo = ({name, email, location, company, img, toggle, error, bio, languages, topRepos}) => {

    console.dir(topRepos);

    let hiddenHTML;
    let reposInfo;
    const errorMessage = <><p style={{color: 'red', marginTop: '2%', fontSize: 20}}>Invalid username, try again!</p></>

    if (error) {
        hiddenHTML = errorMessage; 
    }

    
    if (languages) {
        reposInfo = <span className='lang'>{languages}</span>
    } else {
        reposInfo = languages;
    }

    let reposHTML = [];

    if (topRepos) {
        topRepos.forEach((obj, i) => {
            reposHTML.push (
                <div className="user-info-repos-item" key={i}>
                    <h5 style={{'textAlign': 'center', 'marginTop': '15px'}}>{obj.name}</h5>
                    <div style={{'marginTop': '-7%', 'marginLeft': '5%'}}>
                        <span>Description: {obj.description}</span><br />
                        <span>Stars: {obj.stars}</span><br />
                        <span>Forks: {obj.forks}</span>
                    </div>
                </div>
            )
        });
    }
    

    console.log(reposHTML);
    
    if (toggle) {
        hiddenHTML = <>
                        <div className="user-info-wrapper">
                            <img src={img} alt="avatar" />
                            <ul>
                                <li>Name: {name ?? 'not specified'}</li>
                                <li>E-mail: {email ?? 'not specified'}</li>
                                <li>Location: {location ?? 'unknown'}</li>
                                <li>Company: {company ?? 'unknown'}</li>
                            </ul>
                        </div>
                        <span className='bio'>Bio: {bio ?? 'empty'}</span>
                            {reposInfo}
                            <h3>{reposHTML.length > 0 ? 'Top repositories:' : null}</h3>
                        <div className="user-info-repos">
                            {reposHTML} 
                        </div>
                     </> 
    }

    return (
        <>
            {hiddenHTML}
        </>
    )
}

export default UserInfo;