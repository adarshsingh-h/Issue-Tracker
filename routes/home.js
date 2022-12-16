const express = require('express');
const router = express.Router();
const homeController = require('../controller/home')

//getting home page
router.get('/', homeController.getProjectList);

//get create-project page
router.get('/create', homeController.getProject);

//post create-project data
router.post('/create', homeController.postProject);

//get project details page
router.get('/project-details/:projectId', homeController.getProjectDetailPage);

//get create issue page
router.get('/create-issue/:projectId', homeController.createIssue);

//post create issue data
router.post('/create-issue/:projectId', homeController.postIssue);

//filter by title
router.post('/filter-by-title/:projectId', homeController.filterByTitle);

//filter by author
router.post('/filter-by-author/:projectId', homeController.filterByAuthor);

// //filter by labels
router.post('/filter-by-label/:projectId', homeController.filterByLabel);

//clearing the filter
router.get('/clear/:projectId', homeController.clearFilter);

module.exports = router;
