# /models/User.ts

## Code

```javascript
const UserSchema = new Schema(
{
    // name, description, contact photo, contact info and notes
    name: {
        type: String,
        default: null
    },
    description: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    businessID: [
        {
            type: Schema.ObjectId
        }
    ],
    role: {
        buys: [{
            type: Number
        }],
        calendar: [{
            type: Number
        }],
        calendarGoogle: [{
            type: Number
        }],
        calendarMicrosoft: [{
            type: Number
        }],
        ...
    },
    thumbnail: {
        type: Buffer,
        required: false
    },
    note: {
        type: String,
        required: false
    }
},
{
    timestamps: true
}
);
```

The model it's self-explanatory, however, one part needs mention:

### role

Each key will store a number, corresponding to the role the user has for the module already available in Lion's app. These keys are arrays, because each index will match with businessID's index.

```javascript
role:
{
    buy: [{
        type: Number
    }],
    calendar: [{
        type: Number
    }],
    calendarGoogle: [{
        type: Number
    }],
    calendarMicrosoft: [{
        type: Number
    }],
    ...
},
```

For example, if you find a Document with this data:

```javascript
businessID: [ObjectId(xxx), ObjectId(yyy), ObjectId(zzz)],
role: {
    buy: [0, 5, 9]
}
```

This means the user has role 0 for business *xxx*, role 1 for *yyy* and role 2 for *zzz*. 

### Which means each role?

Here you will find a small list. Empty roles are for future-proofing:

0) User can't access or view that module
1) User can see the module in the dashboard. If he/she want to enter, a button will appear to request approvation of the admin for a elapsed time
2) empty / not valid
3) User can see the data stored for that module (no glossary)
4) empty / not valid
5) User can see the data stored for that module (glossary too)
6) empty / not valid
7) Same as role 2. Create, edit and delete data stored for that module with previous approvation of the admin
8) empty / not valid
9) View, create, edit and delete data stored for that module without need of approvation. (can view the glossary)
10) empty / not valid
11) The user is owner of the business which owns that module (is admin)

#### Continuing with the example

The user with role 0, 3 and 5 in *buy* key, leaves clear he don't own the module for first business. However in the next two business, he can see the data of that module + glossary, and can moderate without approvation of the admin + view the glossary.

### What's the glossary?

The glossary is a quick overview of the data that module can calculate. For example, if you are viewing the glossary of Sales modules, you can check for total earning, total capital invested, etc.