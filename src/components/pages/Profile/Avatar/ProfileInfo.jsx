import React from 'react';
import Avatar from './Avatar';
import classes from './Avatar.module.css';
import youtube from './../../../../assets/images/youtube.svg';
import vk from './../../../../assets/images/vk.svg';
import twitter from './../../../../assets/images/twitter.svg';
import mainLink from './../../../../assets/images/link.svg';
import instagram from './../../../../assets/images/instagram.svg';
import website from './../../../../assets/images/globe.svg';
import github from './../../../../assets/images/github.svg';
import facebook from './../../../../assets/images/facebook.svg';
import EditBtn from './EditBtn';

const ProfileInfo = (props) => {
    return (
        <div className={classes.profile__avatar}>
            <Avatar
                isOwner={props.isOwner}
                photo={props.profile.photos.large}
                savePhoto={props.savePhoto}
                isPhotoSaving={props.isPhotoSaving}
            />
            <div className={classes.fullName}>
                <span>
                    {props.profile.fullName}

                </span>
            </div>
            <div className={classes.lookFJ}>
                <span className={classes.bold}>
                    Looking for a job:
                </span>
                <span>
                    {props.profile.lookingForAJob
                        ? " Yes"
                        : " No"}
                </span>
            </div>
            <div className={classes.lookFJD}>
                <span>
                    {props.profile.lookingForAJobDescription}
                </span>
            </div>
            <div className={classes.aboutMe}>
                <span className={classes.bold}>
                    About me:
                </span>
                <span>
                    {" " + props.profile.aboutMe}
                </span>
            </div>
            <div className={classes.mainlinks_wrapper}>
                <div className={classes.firstlinks_wrapper}>
                    <div className={classes.links_wrapper}>
                        <a target="_blank" className={classes.links} href={props.profile.contacts.youtube ? props.profile.contacts.youtube : "https://youtube.com/"}>
                            <img className={classes.links} src={youtube} />
                        </a>
                    </div>
                    <div className={classes.links_wrapper}>
                        <a target="_blank" className={classes.links} href={props.profile.contacts.vk ? props.profile.contacts.vk : "https://vk.com/"}>
                            <img className={classes.links} src={vk} />
                        </a>
                    </div>
                    <div className={classes.links_wrapper}>
                        <a target="_blank" className={classes.links} href={props.profile.contacts.twitter ? props.profile.contacts.twitter : "https://twitter.com/"}>
                            <img className={classes.links} src={twitter} />
                        </a>
                    </div>
                    <div className={classes.links_wrapper}>
                        <a target="_blank" className={classes.links} href={props.profile.contacts.instagram ? props.profile.contacts.instagram : "https://instagram.com/"}>
                            <img className={classes.links} src={instagram} />
                        </a>
                    </div>
                </div>
                <div className={classes.secondlinks_wrapper}>
                    <div className={classes.links_wrapper}>
                        <a target="_blank" className={classes.links} href={props.profile.contacts.github ? props.profile.contacts.github : "https://github.com/"}>
                            <img className={classes.links} src={github} />
                        </a>
                    </div>
                    <div className={classes.links_wrapper}>
                        <a target="_blank" className={classes.links} href={props.profile.contacts.facebook ? props.profile.contacts.facebook : "https://facebook.com/"}>
                            <img className={classes.links} src={facebook} />
                        </a>
                    </div>
                    <div className={classes.links_wrapper}>
                        <a target="_blank" className={classes.links} href={props.profile.contacts.website ? props.profile.contacts.website : "https://website.com/"}>
                            <img className={classes.links} src={website} />
                        </a>
                    </div>
                    <div className={classes.links_wrapper}>
                        <a target="_blank" className={classes.links} href={props.profile.contacts.mainLink ? props.profile.contacts.mainLink : "https://mainLink.com/"}>
                            <img className={classes.links} src={mainLink} />
                        </a>
                    </div>
                </div>
            </div>
            {props.isOwner && <EditBtn activateEditMode={props.activateEditMode}/>}
        </div>
    );

}

export default ProfileInfo;