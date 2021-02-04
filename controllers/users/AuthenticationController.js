const googleOAuth = require('../../services/users/GoogleOAuthService');
const userService = require('../../services/users/user-service');

module.exports = (app) => {
    const login = async (req, res) => {
        try {
            const code = req.body.code;
            const profile = await googleOAuth.getProfileInfo(code);
            const role = req.params['role']
            let user = {
                userId: profile.sub,
                name: profile.name,
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.email,
                profilePic: profile.picture,
                role: role
            };
            userService.findUserById(user.userId).then(x => {
                if (x === null) {
                    userService.addUser(user)
                        .then(y => {
                            user = y;
                            res.send({user})
                        });
                } else {
                    user = x;
                    res.send({user});
                }
            });
        } catch (e) {
            console.log(e);
            res.status(401).send();
        }
    }
    app.post('/api/auth/google/:role', login);
};
