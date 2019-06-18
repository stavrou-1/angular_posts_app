# angular_posts_app
Author: Yiannis Stavrou

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

## To view the app on S3
http://stavrou123z-angular123z-devops123z-production.s3-website.us-east-2.amazonaws.com

## To install npm or node

https://nodejs.org/en/download

## To install app dependencies 

Run `npm i` or `npm install`

## Build & development

Run `gulp` for building and starting the application.

## Testing

Running `gulp test` will run the unit tests with karma / jasmine.

## Improving this appliation
## 1.) What type of security might we want to implement?
    At Valtira we used Amazon Cognito for authentication in a lot of our applications both mobile and web apps. What's great about AWS Cognito is that there a lot of things out of the box like sign up,authentication, disabling and enabling MFA (multi-factor authentication) for a user pool, sending verification codes via SMS to mobile devices and email addresses and the ability to change passwords once authenticated at ease. Here is some of the documentation:

    https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html

## 2.) How can we make this more user friendly?
    So I think there is a lot of room for improvements here.

    - Site performance can be improved (speed). We can minify every JS and CSS file to the distribution folder (or dist).

    - Add call to action buttons in the jumbotron or header section of the pages. This is generally the first or second area of the page that users see when visiting your page (think from top left to middle to bottom).

    - Improvements to contact page. Provide ease of use. A simple form with limited inputs is always preferable to too many cluttered forms having too many inputs.

## 3.) Why did you choose the framework that you did?
    One thing that is great about AngularJS is that a lot of features (functionality) comes out of the box and you do not have to pull as many libraries in to your app from 3rd party resources. It was easy to implement a search component with sortable table headers becauses of the way AngularJS is constructured. The two-way data binding enables developers to readily implement business logic and display any data in the UI very easily.

    Having these tools handy with AngularJS both speeds up development time and reduces costs.

## 4.) What steps would you take in deploying this application to production?
    - Automate As Much As Possible. A lot of the automation can be done via AWS code pinelines. AWS CodePipeline is a continuous integration and continuous delivery service for fast and reliable application and infrastructure updates. CodePipeline builds, tests, and deploys your code every time there is a code change, based on the release process models you define. At my company each GIT branch was monitors (DEV and MASTER). Each time a push was made the application content automatically started building to thier appropriate enviornments (DEV and PRODUCTION). See here https://aws.amazon.com/codepipeline for documentation on the AWS Codepipeline service.

    - Build and Pack Your Application Only Once. This can be done utilizing useful build systems like Gulp, Grunt or Webpack

    - Deploy the Same Way All the Time. This ensure consistency.

    - Deploy in Small Batches, and Do It Often. It is easier to fix bugs in an application when there are just a few of them. For that reason - deploying often and pushing often is recomended.


## 5.) What steps would you take in making your application scalable?
    As the code base grows we need to ensure that scalibitiy ensues.
    - Scope soup -> Component based architecture
    - How to share functionality and give components context
    - All logic streams up to a common ancestor
    - Seperate UI components and business logic
    - Organizing your code
    One of the ways this can be done is using the folders pattern: a directory for each type of object. So directives would have their own /directives folder, filters would have their own /filters folder and so on.

    Migrating to the modular architecture:
    Many projects start out with the folders pattern but end up being more suited for the modular architecture. If you find yourself wanting to migrate from the folders pattern to the module pattern, here’s some advice.

    Create a branch. This is just common software engineering practice. Major changes like these should always be done on a branch. Better yet, use branches and pull requests for every chunk of work you do, but that’s another story.
    
    Work feature-by-feature. Don’t try to rearrange the whole application overnight. You’ll end up breaking the entire application and spending hours trying to fit all the pieces back together. Debugging is hard if you’ve changed pretty much everything. It’s easier to just take one feature, create a module for it, move it’s parts into place and make sure it works. Then move to the next feature. Remember, it’s an iterative process.
    
    If you’re unsure if something is part of a feature or not, leave it. You can always move it later. Start with the big and obvious chunks of work.

## 6.) How about developer onboarding? How would you optimize your application code to be accessible for other developers new to the project?
    When welcoming a new developer to your team, from the codebase to code standards, team workflows to team culture, and more, there is a lot to bring them up to speed on. You can integrate your new developer as a fully competent, productive, and satisfied team member.
    - Documentation is so important and should lead the list. Ensure that there is a readme.md file for each project and that it contains all the neccessary information to get started understanding how the application works and how to get started working on it.
    - Communication Even before work begins, you should start to include your new team member in communications: email chains, Slack channels, weekly updates, etc. There’s no need to pile everything on all at once — ease them in one channel at a time to let them get comfortable with your communication flows.
    - Evaluation by sticking to clean code standards, code coverage expectations, and timeboxed sprints. Use a code review process to make sure new team members are meeting code standards and offer suggestions on where they can improve. Additionally, have periodic discussions on current workflow processes and address any barriers or bottlenecks.

    Be sure to measure by quality, not quantity. One thousand lines of messy code will never be as good as 100 lines of clean code.
    - Integrating Remote Developers If remote team members understand the company and its goals, they will be more likely to feel like they are part of the team.

## 7.) What feedback would you give to the developers of this API, what improvements could
be made from your perspective as a client?
    Per (1): Once a user has created an account via AWS Cognito and those  credentials are authenticated - then an authentication token (or id token) is created. For securing API endpoints we could  require that the headers of each request contains a valid id token like the following:
    headers: {
        Authorization: 'Bearer c3V2b2ppd...xxxxx....(TOKEN)'
    }
    If any request fails to authenticate upon request the server responds with a 403 (unauthorized or forbidden) response and those API endpoints and its data are not exposed.