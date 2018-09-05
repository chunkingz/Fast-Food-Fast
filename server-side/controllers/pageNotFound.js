// 404, page not found controller

class pageNotFound {

    static pageNotFound(req, res) {

        return res.status(404).json({
            status: 'fail',
            message: '404, page not found',
        });
    };
};

export default pageNotFound;