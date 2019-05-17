export const environment = {
  production: true,
  host: 'http://91.211.249.38:8888/ctc/',


  /**
   * Video
   * **/
  apiUrlVideo: 'api/video/getAll',


  /**
   * User
   * **/
  apiUrlUser: 'api/user',

  /**
   * Trainers
   * **/
  apiUrlTrainers: 'api/trainers/getAll',
  apiUrlGetAllNameSkills: 'api/trainers/training/name-id',
  apiUrlTrainersGetOne: 'api/trainers/getOne',

  /**
   * Trainings
   * **/
  apiUrlTrainings: 'api/trainings/getAll',
  apiUrlTrainingsGetOne: 'api/trainings/getOne',
  apiUrlTrainingsOrder: 'api/save/order',
  apiUrlTrainingsInscriptions: 'api/trainings/inscriptions',
  apiUrlDownloadPDF: 'api/trainings/downloadFile',

  /**
   * webinars
   * **/
  apiUrlWebinarsInscription: 'api/webinars/inscription/getAll',
  apiUrlWebinars: 'api/webinars/getAll',
  apiUrlWebinarsGetOne: 'api/webinars/getOne',
  apiUrlInvoiceLiqPayWebinars: 'api/webinars/invoice/liqPay',
  apiUrlCreateWebinarOrder: 'api/webinar/order/save',
  apiUrlWebinarOrderStatus: 'api/webinar/order/status',

  /**
   * Calendar
   * **/
  apiUrlGetAllDateCalendar: 'api/calendar/getAll',


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
 * admin Trainings Article
 * **/
export const eAdminArticleTrainings = {
  production: true,
  adminUrlGetOneArticle: 'admin/trainings/article/getOne',
  adminUrlGetCreateArticle: 'admin/trainings/article/create',
  adminUrlGetUpdateArticle: 'admin/trainings/article/update',
  adminUrlGetStatusArticle: 'admin/trainings/article/status',
};

/**
 *  admin PhotoTrainings
 * **/
export const eAdminPhotoTrainings = {
  production: true,
  adminUrlCreateTrainingsPhoto: 'admin/trainings/photo/create',
  adminUrlUpdateTrainingsPhoto: 'admin/trainings/update/photo',
  adminUrlGetOneTrainingsPhoto: 'admin/trainings/get/photo',
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
 *  admin TrainerTrainings
 * **/
export const eTrainerTrainings = {
  production: true,
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
  production: true,
  adminUrlCheckFilePDF: 'admin/trainings/check/pdf',
  adminUrlCreateFilePDF: 'admin/trainings/create',
  adminUrlUpdateFilePDF: 'admin/trainings/update/pdf'
};

/***
 * admin Contacts
 * **/
export const eContacts = {
  production: true,
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

/**
 * admin Inscriptions
 * **/
export const eAdminInscriptions = {
  production: true,
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
  production: true,
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
  production: true,
  adminUrlGetOnePhotoWebinars: 'admin/webinars/get/photo',
  adminUrlCreatePhotoWebinars: 'admin/webinars/create/photo',
  adminUrlUpdatePhotoWebinars: 'admin/webinars/update/photo',
  adminUrlCheckPhotoWebinars: 'admin/webinars/check/photo',
};


/**
 * admin Webinar Order
 * **/
export const eAdminWebinarOrder = {
  production: true,
  adminUrlGeOneOrder: 'admin/webinars/order/getOne',
  adminUrlGetAll: 'admin/webinars/order/all',
  adminUrlDelete: 'admin/webinars/order/delete',
};
export const eAdminLiqPayOrder = {
  production: true,
  adminUrlGeOneLiqPayOrder: 'admin/get/one/liqPayOrder',
};

/**
 * admin Inscriptions
 * **/
export const eAdminWebinarInscriptions = {
  production: true,
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
  production: true,

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
  production: true,

  adminUrlPhotoGetOne: 'admin/blog-photo/getOne',
  adminUrlPhotoCheck: 'admin/blog-photo/check',
  adminUrlPhotoCreate: 'admin/blog-photo/create',
  adminUrlPhotoUpdate: 'admin/blog-photo/update',

};
