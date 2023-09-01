/**
 * This class renders the about page
 *
 */

export const aboutController = {
  /**
 * This method renders
 * the viewData object in the about-view
 *
 */
  index(request, response) {
    const viewData = {
      title: "About This Application",
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};
