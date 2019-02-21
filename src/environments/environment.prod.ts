export const environment = {
  production: true,
  host: 'http://91.211.249.38:8888/ctc/',

  // Video
  apiUrlVideo: 'api/video/getAll',
  // User
  apiUrlUser: 'api/user',
  // Trainers
  apiUrlTrainers: 'api/trainers/getAll',
  apiUrlTrainersGetOne: 'api/trainers/getOne',
  // Trainings
  apiUrlTrainings: 'api/trainings/getAll',
  apiUrlTrainingsOrder: 'api/save/order',
  apiUrlTrainingsInscriptions: 'api/trainings/inscriptions'
};



/**
 *customer url (photo start page)
 * ***/
export const eHomePhoto = {
  production: true,

  apiUrlPhotoPageStartGetAll: 'api/photoPage/getAll',
  apiUrlPhotoPageStartGetOne: 'api/photoPage/getOne'
};

export const eAdminVideo = {
  production: true,
  adminUrlGetAllVideo: 'admin/video/getAll',
  adminUrlCreateVideo: 'admin/create-video',
  adminUrlUpdateVideo: 'admin/update-video',
  adminUrlDeleteVideo: 'admin/delete-video',
};


/**
 *  admin User Service
 * **/
export const eAdminUserDetails = {
  production: true,
  adminUrlUserService: 'admin/user/service/details',
};


/**
 *  admin auth
 * **/
export const eAdminAuth = {
  production: true,
  adminUrlSignin: 'api/auth/signin',
  adminUrlSignup: 'api/auth/signup',
};


/**
 *  admin account service
 * **/
export const eAdminAccountService = {
  production: true,
  adminUrlChangePassword: 'admin/user/change-password',
  adminUrlGetAllUserAdmin: 'admin/user/getAll-users-admin',
  adminUrlDeleteUser: 'admin/user/delete-user'
};


/**
 *  admin Trainings
 * **/
export const eAdminTrainings = {
  production: true,
  adminUrlGetAllTrainings: 'admin/trainings/getAll',
  adminUrlGetOneTrainings: 'admin/trainings/getOne',
  adminUrlUCreateTrainings: 'admin/trainings/create',
  adminUrlUpdateTrainings: 'admin/trainings/update',
  adminUrlDeleteTrainings: 'admin/trainings/delete'
};


/**
 *  admin Trainers
 * **/
export const eAdminTrainers = {
  production: true,
  adminUrlGetAllTrainers: 'admin/trainers/getAll',
  adminUrlGetOneTrainers: 'admin/trainers/getOne',
  adminUrlDeleteTrainers: 'admin/trainers/delete',
  adminUrlCreateTrainers: 'admin/trainers/create',
  adminUrlUpdateTrainers: 'admin/trainers/update',
  adminUrlTrainersCreatePhoto: 'admin/trainers/photo/create',
  adminUrlTrainersGetPhoto: 'admin/trainers/get/photo',
  adminUrlTrainersUpdatePhoto: 'admin/trainers/update/photo'
};

/**
 * admin order
 * **/
export const eAdminOrder = {

  production: true,
  adminUrlGetAllOrder: 'admin/order/getAll',
  adminUrlDeleteOrder: 'admin/order/delete',
  adminUrlGetOneOrder: 'admin/order/getOne',
  adminUrlSetStatusOrder: 'admin/order/setStatus'
};

/**
 * admin Calendar Trainings
 * ***/
export const eAdminCalendarTrainings = {
  production: true,
  adminUrlGetAllTrainingsCalendarEvent: 'admin/trainings/calendar/showAllTrainingsCalendar',
  adminUrlSaveCalendarTrainingsEvent: 'admin/trainings/calendar/saveTrainingsDate',
  adminUrlGetOneTrainingsCalendarEvent: 'admin/trainings/calendar/getId',
  adminUrlUpdateTrainingsCalendarEvent: 'admin/trainings/calendar/updateTrainingsDate',
  adminUrlDeleteTrainingsCalendarEvent: 'admin/trainings/calendar/deleteEventCalendarTraining'
};

/**
 * admin User
 * **/
export const eAdminUser = {
  production: true,
  adminUrlUserAll: 'admin/user/getAllUser',
  adminUrlGetOneUser: 'admin/user/getOne',
  adminUrlCreateUser: 'admin/user/create',
  adminUrlUpdateUser: 'admin/user/update',
  adminUrlDeleteUser: 'admin/user/delete',
};

/**
 * admin Photo start page
 * ***/
export const eAdminPhotoStartPage = {
  production: true,
  adminUrlPhotoPageStartGetAll: 'admin/photoPage/getAll',
  adminUrlPhotoPageStartGetOne: 'admin/photoPage/getOne',
  adminUrlPhotoPageStartCreate: 'admin/photoPage/create',
  adminUrlPhotoPageStartUpdate: 'admin/photoPage/update',
  adminUrlPhotoPageStartDelete: 'admin/photoPage/delete'
};

export const eAdminInscriptions = {
  production: true,
  adminUrlGetAllInscriptions: 'admin/trainers/inscriptions/getAll',
  adminUrlGetOneInscriptions: 'admin/trainers/inscriptions/getOne',
  adminUrlCreateInscriptions: 'admin/trainers/inscriptions/create',
  adminUrlUpdateInscriptions: 'admin/trainers/inscriptions/update',
  adminUrlDeleteInscriptions: 'admin/trainers/inscriptions/delete'
};
