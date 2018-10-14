"use strict";

const Chance = require("chance");
const chance = new Chance();

const md5 = require('md5');

module.exports = {

  generateRandomUser: () => {
    const gender    = chance.gender();
    const firstName = chance.first({gender: gender});
    const lastName  = chance.last();
    const userName  = firstName + " " + lastName;

    let userHandle = "@";
    if (Math.random() > 0.5) {
      let prefix    = chance.prefix({gender: gender});
      prefix = prefix.replace(".", "");
      userHandle += prefix
    }

    userHandle += lastName;

    if (Math.random() > 0.5) {
      const suffix = Math.round(Math.random() * 100);
      userHandle += suffix;
    }

    let arrayOfCodes = [1083552, 1083561, 1083541, 1083548, 1083547, 1083551, 1083566, 1083544, 1083553,1083570, 1083540, 1083569, 1083550,1083559]
    var randomIndex = Math.floor(Math.random() * arrayOfCodes.length);
    var randomElement = arrayOfCodes[randomIndex];
    
const avatarUrlPrefix = `https://image.flaticon.com/icons/svg/1083/${randomElement}.svg`;
    // const avatarUrlPrefix = `https://vanillicon.com/${md5(userHandle)}`;
    const avatars = {
      small:   `${avatarUrlPrefix}`,
      regular: `${avatarUrlPrefix}`,
      large:   `${avatarUrlPrefix}`
    }

    return {
      name: userName,
      handle: userHandle,
      avatars: avatars
    };
  }
};
