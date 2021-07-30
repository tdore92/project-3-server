# Project-3

<h2>Overview</h2>

<p>For our third GA project we were tasked with building and deploying a full stack MERN app. Taking the name ‘Async or Swim’ my team and I decided to create MontVenture, an adventure based app that would allow users to search for mountain based activities in their chosen town or city. The activities would be divided into two Summer and Winter subgroups, and registered users could create their own ‘activity posts’, as well as leave comments on a desired activity.</p>

<a href="">Visit MontVenture here.</a>

<a href="https://github.com/tdore92/project-3-server">Client Repository</a>

<img src="https://i.imgur.com/RAvdPV4.png?1" alt="MontVenture logo"/>

<h2>Brief</h2>

<li>Application must be full-stack, and use an Express API consumed with a React front-end.</li>
<li>Data must be served with MongoDB.</li>
<li>Utilise multiple relationships and CRUD functionality.</li>
<li>Have a visually impressive design.</li>
<li>Be deployed online.</li>
<li>Dev Time: 1 week.</li>

<h2>Technologies</h2>

<li>HTML</li>
<li>CSS</li>
<li>React</li>
<li>SASS</li>
<li>Bulma</li>
<li>Axios</li>
<li>Node.js</li>
<li>MongoDB</li>
<li>Express</li>

<h3>Approach Taken</h3>

<p>After a period of brainstorming Raph, Drew and I sat down to pseudo-code our idea, outlined the components we'd need for the front end and the models we wanted for our backend. In this case, it would be 'activities' and 'user' models.</p>

<img src="https://i.imgur.com/KBIIwl4.png" alt="MontVenture Pseudo"/>

<p>Project 2 was a live sharing project over 24 hours, and being a team of three over an entire week, was not a feasible option in this case. We set up a git repository, designated sections for each team member to work on and on each commit, would coordinate to resolve conflicts that arose on each merge to ensure functionality was maintained.</p>

<h3>Backend</h3>

<p>Using Mongoose as our ORM, I created our basic activities schema, including a ‘season’ field which would be used to filter the schema depends on the page the user redirects to. Once the schema was complete I created the CRUD controllers and tested each of our endpoints. The basic functionalities in place, I then added an embedded comments schema and the extra RESTful routes for CRUD actions on the frontend SHOW pages.</p>

```
const activitySchema = new mongoose.Schema({
  country: { type: String, required: true },
  activityName: { type: String, required: true },
  description: { type: String, required: true },
  season: { type: String, required: true },
  categories: {
    type: [String],
    required: true,
    validate: [
      { validator: (categories) => categories.length > 0, msg: 'You must have at least one category.' }
    ],
  },
  imageUrl: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
})
```
```
//embedded schema
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})
```

<p>From here we moved onto creating register/login forms and controllers. We ensured data security by hashing the passwords with bcrypt and using pre-validate hooks to check the password and confirmation schemas match. To avoid the confirmation data being added to the database, we used a Mongoose virtual.</p>

```
schema.pre('save', function encryptedPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

schema 
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

schema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
    // validation error.. invalidate and say whats wrong
      this.invalidate('passwordConfirmation', 'should match password')
    }
    next()
  })
```

<h3>Frontend</h3>

<p>I created a 'Summer' and 'Winter' page, and within each component filtered the desired results using the 'season' object field.</p>

```
const summerFilteredActivities = activities?.filter((activity) => {
    return (
      activity.season.includes('summer')
    )
  })
```
```
const winterFilteredActivities = activities?.filter((activity) => {
    return (
      activity.season.includes('winter')
    )
  })
```

<p>I then went on to create the comments function. In the interests of time I decided to leave full CRUD functionality for a later date, and focused on CREATE and UPDATE controllers. The commentSchema held a user validation so logged in users only could comment, as was the case for posting new activities.</p>

<p>Since the comments could initially be created and updated, the ActivityComments component required me to import React and set state, and use an effect hook to perform getComments & handleSubmit/Change effects, using the activityId as a parameter.</p>

```
function Comments() {
  const { activityId } = useParams()
  const [comments, setComments] = React.useState(null)
  const [text, setText] = React.useState('')
  console.log(comments)

  React.useEffect(() => {
    const getData = async () => {
      const response = await getComments(activityId)
      console.log(response.data.comments)
      setComments(response.data.comments)
    }
    getData()
  }, [activityId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e)
    try {
      await submitComment(activityId, { text })
      const response = await getComments(activityId)
      setComments(response.data.comments)
      setText('')
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }
```

<p>I then imported the now complete Comments component into ActivityShow. Initially only the loading state would render, and after much debugging it was found to be a syntax error within the backend.</p>

```
<div className="column is-half">
                    <h4 className="title is-4">Comments</h4>
                    {
                      activity.comments.map(comment => <p key={comment._id}>{comment.text} <br /><small>{comment.createdAt}</small></p>)
                    }
                    <div>
                      <Comments />                     
                    </div>
                  </div>
```


<img src="" alt="MontVenture Page">

<h2>Wins</h2>

<p>Team coordination: As a team we had a strong collaborative workflow going on. We efficiently spread out our workflow so the initial building of the backend and base front end only took three days. Once we settled into individually dealing with more complex issues our pace slowed down, but it was an effective method to give us extra time to work on the them.</p>

<h2>Challenges</h2>

<p>Finally getting the comments section functioning took me a day or two, along with the TA's help to deduce the issues were coming from the backend. The time consuming nature of these issues was very apparent!</p>

<h2>Future Features</h2>

<li>Mapbox functionality- the ability to scour a digital map to find activities.</li>
<li>‘My Activities’ page for logged in users.</li>
<li>Adding remaining comments CRUD actions.</li>

<h2>Lessons Learned</h2>

<p>Working on a full-stack project with a looming deadline was good for prioritisation and efficency. Each day, we set out what each member had to accomplish, and allowed us to build a full-stack app without being overwhelmed by the amount of features we wanted to include.</p>
