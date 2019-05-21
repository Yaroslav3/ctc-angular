// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  host: 'http://localhost:8888/',


  /**
   * Video;
   * **/
  apiUrlVideo: 'api/video/getAll',


  /**
   * User;
   * **/
  apiUrlUser: 'api/user',

  /**
   * Trainers;
   * **/
  apiUrlTrainers: 'api/trainers/getAll',
  apiUrlGetAllNameSkills: 'api/trainers/training/name-id',
  apiUrlTrainersGetOne: 'api/trainers/getOne',

  /**
   * Trainings;
   * **/
  apiUrlTrainings: 'api/trainings/getAll',
  apiUrlTrainingsGetOne: 'api/trainings/getOne',
  apiUrlTrainingsOrder: 'api/save/order',
  apiUrlTrainingsInscriptions: 'api/trainings/inscriptions',
  apiUrlDownloadPDF: 'api/trainings/downloadFile',

  /**
   * webinars;
   * **/
  apiUrlWebinarsInscription: 'api/webinars/inscription/getAll',
  apiUrlWebinars: 'api/webinars/getAll',
  apiUrlWebinarsGetOne: 'api/webinars/getOne',
  apiUrlInvoiceLiqPayWebinars: 'api/webinars/invoice/liqPay',
  apiUrlCreateWebinarOrder: 'api/webinar/order/save',
  apiUrlWebinarOrderStatus: 'api/webinar/order/status',

  /**
   * Calendar;
   * **/
  apiUrlGetAllDateCalendar: 'api/calendar/getAll',

  /**
   * Room rental;
   * **/
  apiUrlRoomAll: 'api/room/rental/all',
  apiUrlRoomOne: 'api/room/rental/getOne',
  apiUrlRoomAllPhoto: 'api/room/rental/photo/allPhoto',
  apiUrlRoomDayTimeOrder: 'api/room/rental/date/getTimeOneDay',
  apiUrlRoomPeriodDayOrder: 'api/room/rental/date/getTimePeriodDay',
  apiUrlCreateRoomOrder: 'api/room/rental/order/create',
  apiUrlSaveTimeRoom: 'api/room/rental/date/createOrderTimeRoom',



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
 * admin Trainings Article
 * **/
export const eAdminArticleTrainings = {
  production: false,
  adminUrlGetOneArticle: 'admin/trainings/article/getOne',
  adminUrlGetCreateArticle: 'admin/trainings/article/create',
  adminUrlGetUpdateArticle: 'admin/trainings/article/update',
  adminUrlGetStatusArticle: 'admin/trainings/article/status',
};

/**
 *  admin PhotoTrainings
 * **/
export const eAdminPhotoTrainings = {
  production: false,
  adminUrlCreateTrainingsPhoto: 'admin/trainings/photo/create',
  adminUrlUpdateTrainingsPhoto: 'admin/trainings/update/photo',
  adminUrlGetOneTrainingsPhoto: 'admin/trainings/get/photo',
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
 *  admin TrainerTrainings
 * **/
export const eTrainerTrainings = {
  production: false,
  adminUrlGetAllTrainerTrainings: 'admin/trainers/TrainerTrainings/getAll',
  adminUrlGetOneTrainerTrainings: 'admin/trainers/TrainerTrainings/getOne',
  adminUrlDeleteTrainerTrainings: 'admin/trainers/TrainerTrainings/delete',
  adminUrlCreateTrainerTrainings: 'admin/trainers/TrainerTrainings/create',
  adminUrlUpdateTrainerTrainings: 'admin/trainers/TrainerTrainings/update',
};


/**
 * admin admin/trainers/file/create
 * **/
export const eAdminFilePDFTrainers = {
  production: false,
  adminUrlCheckFilePDF: 'admin/trainings/check/pdf',
  adminUrlCreateFilePDF: 'admin/trainings/create',
  adminUrlUpdateFilePDF: 'admin/trainings/update/pdf'
};

/***
 * admin Contacts
 * **/
export const eContacts = {
  production: false,
  adminUrlGetAllContacts: 'admin/trainers/contacts/getAll',
  adminUrlGetOneContacts: 'admin/trainers/contacts/getOne',
  adminUrlDeleteContacts: 'admin/trainers/contacts/delete',
  adminUrlCreateContacts: 'admin/trainers/contacts/create',
  adminUrlUpdateContacts: 'admin/trainers/contacts/update',
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

/**
 * admin Inscriptions
 * **/
export const eAdminInscriptions = {
  production: false,
  adminUrlGetAllInscriptions: 'admin/trainers/inscriptions/getAll',
  adminUrlGetOneInscriptions: 'admin/trainers/inscriptions/getOne',
  adminUrlCreateInscriptions: 'admin/trainers/inscriptions/create',
  adminUrlUpdateInscriptions: 'admin/trainers/inscriptions/update',
  adminUrlDeleteInscriptions: 'admin/trainers/inscriptions/delete'
};


/**
 * admin Webinars
 * **/
export const eAdminWebinars = {
  production: false,
  adminUrlGetAllWebinars: 'admin/webinars/all',
  adminUrlGetOneWebinars: 'admin/webinars/getOne',
  adminUrlCreateWebinars: 'admin/webinars/create',
  adminUrlUpdateWebinars: 'admin/webinars/update',
  adminUrlDeleteWebinars: 'admin/webinars/delete',
};


/**
 * admin Photo Webinars
 * **/
export const eAdminPhotoWebinars = {
  production: false,
  adminUrlGetOnePhotoWebinars: 'admin/webinars/get/photo',
  adminUrlCreatePhotoWebinars: 'admin/webinars/create/photo',
  adminUrlUpdatePhotoWebinars: 'admin/webinars/update/photo',
  adminUrlCheckPhotoWebinars: 'admin/webinars/check/photo',
};


/**
 * admin Webinar Order
 * **/
export const eAdminWebinarOrder = {
  production: false,
  adminUrlGeOneOrder: 'admin/webinars/order/getOne',
  adminUrlGetAll: 'admin/webinars/order/all',
  adminUrlDelete: 'admin/webinars/order/delete',
};
export const eAdminLiqPayOrder = {
  production: false,
  adminUrlGeOneLiqPayOrder: 'admin/get/one/liqPayOrder',
};

/**
 * admin Inscriptions
 * **/
export const eAdminWebinarInscriptions = {
  production: false,
  adminUrlGetAllWebinarInscriptions: 'admin/webinar/inscriptions/getAll',
  adminUrlGetOneWebinarInscriptions: 'admin/webinar/inscriptions/getOne',
  adminUrlCreateWebinarInscriptions: 'admin/webinar/inscriptions/create',
  adminUrlUpdateWebinarInscriptions: 'admin/webinar/inscriptions/update',
  adminUrlDeleteWebinarInscriptions: 'admin/webinar/inscriptions/delete'
};


/**
 * admin Blog
 * ***/
export const eAdminBlog = {
  production: false,

  adminUrlBlogAll: 'admin/blog/all',
  adminUrlBlogOne: 'admin/blog/one',
  adminUrlBlogCreate: 'admin/blog/create',
  adminUrlBlogUpdate: 'admin/blog/update',
  adminUrlBlogDelete: 'admin/blog/delete',
};

/**
 * admin First Photo Blog
 * **/
export const eAdminFirstPhotoBlog = {
  production: false,

  adminUrlPhotoGetOne: 'admin/blog-photo/getOne',
  adminUrlPhotoCheck: 'admin/blog-photo/check',
  adminUrlPhotoCreate: 'admin/blog-photo/create',
  adminUrlPhotoUpdate: 'admin/blog-photo/update',

};

/**
 * admin Room Rental
 * **/
export const eAdminRoomRental = {
  production: false,
  adminUrlGetAll: 'admin/room/rental/all',
  adminUrlGetOne: 'admin/room/rental/one',
  adminUrlRemove: 'admin/room/rental/remove',
  adminUrlCreate: 'admin/room/rental/create',
  adminUrlUpdate: 'admin/room/rental/update',
};

/**
 * admin Room Article;
 * ***/
export const eAdminRoomArticle = {
  production: false,
  adminUrlCreate: 'admin/room/article/create',
  adminUrlStatus: 'admin/room/article/status',
  adminUrlUpdate: 'admin/room/article/update'
};

/**
 * for admin panel
 * Room prise
 * **/
export const eAdminRoomPrise = {
  production: false,
  adminUrlGetOne: 'admin/room/price/one',
  adminUrlStatus: 'admin/room/price/status',
  adminUrlCreate: 'admin/room/price/create',
  adminUrlUpdate: 'admin/room/price/update'
};

/**
 * for admin panel
 * Photo room
 * **/
export const eAdminRoomPhoto = {
  production: false,
  adminUplGetAll: 'admin/room/photo/getAll',
  adminUplCreate: 'admin/room/photo/create',
  adminUplDelete: 'admin/room/photo/delete',
  adminUplUpdate: 'admin/room/photo/update'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
