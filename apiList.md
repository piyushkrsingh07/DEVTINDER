# DEVTINDER APIs
authRouter
-POST/signup
-POST/login
-POST/logout

## profileRouter
-PATCH/profile/view
-GET/profile/edit
-PATCH/profile/password

## CONNECTIONREQUESTROUTER
-POST/request/send/interested/:userId
-POST/request/send/ignored/:userId
-POST/request/review/accepted/:requestId
-POST/request/review/rejected/:requestId

## USERROUTER
-GET/user/requests
-GET/user/connections

GET/user/feed-GETS you the profile of other user on platform


Status:ignore,interested,accepted,rejected


