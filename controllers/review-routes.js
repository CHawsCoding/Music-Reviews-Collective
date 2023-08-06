const router = require('express').Router();
const { review } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const newReview = await Review.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newReview);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
      try {
        const ReviewData = await Review.destroy({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
    
        if (!ReviewData) {
          res.status(404).json({ message: 'No Review found with this id!' });
          return;
        }
    
        res.status(200).json(projectData);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
    module.exports = router;
