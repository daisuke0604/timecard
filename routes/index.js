exports.index = function(req, res) {
    //res.redirect("/login");
    res.render('index', { title: 'Timecard' });
};

