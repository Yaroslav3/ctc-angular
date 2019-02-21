// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  host: 'http://localhost:8888/',

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
  production: false,

  apiUrlPhotoPageStartGetAll: 'api/photoPage/getAll',
  apiUrlPhotoPageStartGetOne: 'api/photoPage/getOne'
};

export const eAdminVideo = {
  production: false,
  adminUrlGetAllVideo: 'admin/video/getAll',
  adminUrlCreateVideo: 'admin/create-video',
  adminUrlUpdateVideo: 'admin/update-video',
  adminUrlDeleteVideo: 'admin/delete-video',
};


/**
 *  admin User Service
 * **/
export const eAdminUserDetails = {
  production: false,
  adminUrlUserService: 'admin/user/service/details',
};


/**
 *  admin auth
 * **/
export const eAdminAuth = {
  production: false,
  adminUrlSignin: 'api/auth/signin',
  adminUrlSignup: 'api/auth/signup',
};


/**
 *  admin account service
 * **/
export const eAdminAccountService = {
  production: false,
  adminUrlChangePassword: 'admin/user/change-password',
  adminUrlGetAllUserAdmin: 'admin/user/getAll-users-admin',
  adminUrlDeleteUser: 'admin/user/delete-user'
};


/**
 *  admin Trainings
 * **/
export const eAdminTrainings = {
  production: false,
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
  production: false,
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

  production: false,
  adminUrlGetAllOrder: 'admin/order/getAll',
  adminUrlDeleteOrder: 'admin/order/delete',
  adminUrlGetOneOrder: 'admin/order/getOne',
  adminUrlSetStatusOrder: 'admin/order/setStatus'
};

/**
 * admin Calendar Trainings
 * ***/
export const eAdminCalendarTrainings = {
  production: false,
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
  production: false,
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
  production: false,
  adminUrlPhotoPageStartGetAll: 'admin/photoPage/getAll',
  adminUrlPhotoPageStartGetOne: 'admin/photoPage/getOne',
  adminUrlPhotoPageStartCreate: 'admin/photoPage/create',
  adminUrlPhotoPageStartUpdate: 'admin/photoPage/update',
  adminUrlPhotoPageStartDelete: 'admin/photoPage/delete'
};

export const eAdminInscriptions = {
  production: false,
  adminUrlGetAllInscriptions: 'admin/trainers/inscriptions/getAll',
  adminUrlGetOneInscriptions: 'admin/trainers/inscriptions/getOne',
  adminUrlCreateInscriptions: 'admin/trainers/inscriptions/create',
  adminUrlUpdateInscriptions: 'admin/trainers/inscriptions/update',
  adminUrlDeleteInscriptions: 'admin/trainers/inscriptions/delete'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
