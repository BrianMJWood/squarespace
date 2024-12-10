Welcome to Squarespace! Thank you for checking out my app. I named it Squarespace because it's a space in which you'll see 100 squares - Plus, it's a truly original name that nobody has ever used or thought of before!

Prerequisites to run the app: Node.JS and the Angular CLI. Information on getting those tools is here: https://angular.dev/tools/cli/setup-local

Once you have Node.JS and the Angular CLI installed, run the app by using your terminal to navigate to this app's directory, and typing "ng serve" in the Angular CLI.

I felt one of the biggest challenges on this project was to adhere to the requirement of showing a layout of components in a 10x10 grid. Given that I want this to be accessible and mobile-friendly, there are many questions and problems that arise from how to always maintain a 10x10 grid under variable conditions.

State management is handled by the new(ish) Angular Signals which I am quickly becoming a big fan of. Unit testing is especially far more simple. NgRx was a consideration, but is somewhat overkill for such a small, simple app like this. I try to breathe simplicity!

Some Q&A:

1. We use JWTs a lot throughout our API. For instance, when a user logs in on our API, a JWT is issued and our web-application uses this token for every
   request for authentication. Here's an example of such a token: {Removed to avoid committing a plain-text JWT}
   Why is it (or isn't it) safe to use JWTs? (hint: the token is one string, the pdf might breaks it into multiple lines)

   - My understanding is that JWTs can be prone to similar attacks as old SQL-injection attacks. Any JWT is always structured in the same pattern, and can be easily broken down into different specific pieces. It could be possible to reassemble decoded pieces into a new malicious JWT, or access a JWT from a user's machine maliciously. I believe that there are basic sanitizing methods handled on the back end that mitigate these possibilities. Ultimately, the format, structure, type and location of any data (in particular, data recieved from any user) passed between front and back end systems needs to be tightly checked and controlled.

   A quick Google search also shows that yeah, instead of SQL injections it's JavaScript injection that is a primary concern with JWTs.

2. In our web-application, messages sent from one user to another, can contain HTML, which poses some security risks. Describe two attack vectors
   bad actors might try to abuse? And how would you mitigate these vectors?

   - Similar to the above answer, all data passed between systems needs to be tightly typed and handled. If I send someone a message that contains HTML, or a SQL query, JavaScript, etc, that text needs to be sanitized when it is sent, received and rendered. How that sanitization is done can vary depending on the languages and frameworks used, but I believe basic Content Security Policies will help control this.

3. Explain the difference between mutable and immutable objects.

   - Mutable and immutable are simply other terms for "changeable" and "non-changeable" - If an object is mutable, I can change its values and properties. If an object is immutable, I cannot.

   ● What is an example of an immutable object in JavaScript?

   - This is a great question, thank you! I'll admit I did some reading just now to update my understanding. If I understand correctly, primitives in JavaScript are immutable, stored in memory, but objects as we typically know them are mutable, and stored/accessed by reference. I believe the only way to make an immutable object would be to use specific methods to lock/freeze objects from being altered.

   So instead, it's certainly better to leave objects as they are and, when we need to alter or manipulate object data, create a copy of that data. Alter the copy, and render that.

   ● What are the pros and cons of immutability?

   - Off the top of my head, the biggest pro of immutability is having a single source of truth for your data. You don't want to have to worry about that data being anything touched or altered by any part of your app. This is, I believe, a fundamental principle used in NgRx.

   - I'm unfamiliar with any specific cons to immutability outside of some learning curve difficulties - It's easy to just manipulate data and run with it, but that's not practical in the long term, especially on an enterprise-level application. I've just now read a bit that the practice of immutability and creating more new objects than manipulating existing ones can lead to performance concerns at a significant scale.

   ● How can you achieve immutability in your own code?

   - Aside from using modern tools like Angular Signals and RxJs, basic immutability practice involves understanding when you are or are not mutating objects. A simple example would be using a spread operator to create a new array and add onto it, like I did here in my fetchPosts() method.

4. If you would have to speed up the loading of a web-application, how would you do that? (no need to actually do it, just describe the steps you
   would take)

   - My first thought goes to analytics. I've used Datadog in past roles to identify patterns and bottlenecks. I believe the best way to speed up the loading of a web application is to identify where are the slowest points.

   Depending on what's identified, there could be a variety of solutions. Are there multiple calls happening that could be performed asynchronously? Are there multiple subscriptions being chained in a sequence that could instead be handled by an RxJs combineLatest? Are we using Angular's lazy loading techniques? etc
