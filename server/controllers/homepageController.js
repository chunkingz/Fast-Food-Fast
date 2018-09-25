// 200, homepage controller

class homepageController {

    static homepageController(req, res) {

        return res.status(200).json({
            status: 'success',
            message: 'Welcome to the Fast-Food-Fast API',
        });
    };
};

export default homepageController;