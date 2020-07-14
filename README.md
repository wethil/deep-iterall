

# deep-iterall

deep-iterall is a module that helps you to iterate every technically iterable thing deeply.

- Work with ***Objects***, ***Arrays*** and ***Array-likes*** variables

- Accepts middleware to manage the returned result

- Accepts ***Map***, ***Set*** and ***NodeList*** collections besides ***Arrays*** and ***Objects***

### Installation

For yarn

```bash
yarn add deep-iterall
```

For npm

```bash
npm  install --save  deep-iterall
```

### Importing to the Project

```js
const  DeepIterall = require('deep-iterall');
```
or you use ES6 import

```js
import  DeepIterall  from  'deep-iterall';
```

### Usage

Basically ***DeepIterall*** is a class that return an instance to do the job. So, create an instance from this class

### Example

```js

const  illinoisUniversities = [
{
university:  "Eastern Illinois University",
city:  "Charleston",
state:  "Illinois",
established:  "1895",
departments: [
	{
		id:  "0",
		name:  "Business and Technology",
		places: { arena:  "Lartz Arena", stadium:  "O'Brien stadium" },
		areas: ["School of Business", "Hospitality and Tourism", "School of Technology"]
	}]
}
//....
]

const deeplyIteratedCollection = new DeepIterall(illinoisUniversities);

console.log(deeplyIteratedCollection.run())
/*
 [
 'university',
  'city',
  'state',
  'established',
  'departments',
  'id',
  'name',
  'places',
  'arena',
  'stadium',
  'areas',
  'School of Business',
  'Hospitality and Tourism',
  'Technology, School of' ]
*/
  

```

### Options

 - `objectValues` : Default **false** , Return an object's key with its value as an object that iterating at the time
 - `excludeObjectKeysWithIterableValue` Default **true** , Result won't include the object keys that their values are iterable elements

```js
const  iterator = new  DeepIterall(usaUniversities, { objectValues: true });
/*
[ { university: 'Eastern Illinois University' },
  { city: 'Charleston' },
  { state: 'Illinois' },
  { established: '1895' },
  { id: '0' },
  { name: 'Business and Technology' },
  { arena: 'Lartz Arena' },
  { stadium: 'O\'Brien stadium' },
  'School of Business',
  'Hospitality and Tourism',
  'Technology, School of' ]
*/

  
  const  iterator = new  DeepIterall(usaUniversities, { excludeObjectKeysWithIterableValue: false });
/*
[ 'university',
  'city',
  'state',
  'established',
  'id',
  'name',
  'arena',
  'stadium',
  'School of Business',
  'Hospitality and Tourism',
  'Technology, School of' ]
*/
```

### Methods
##### run()
Run the whole iteration.

##### addContent(content) `content: Array`
Add new content to existing content. (this won't delete the previous content)
```js
    const deeplyIteratedCollection = new DeepIterall(illinoisUniversities);
	deeplyIteratedCollection.addContent(anotherStateUniversitiesArray)
```	
##### addMiddleware(middleware)  `middleware: Array of middlewares or Middleware`
Add one ore more middleware function to manage returnet elemetns.
```js
    deeplyIteratedCollection.addMiddleware(lodash.upperCase)
    /*
    [ 'UNIVERSITY',
	  'CITY',
	  'STATE',
	  'ESTABLISHED',
	  'ID',
	  'NAME',
	  'ARENA',
	  'STADIUM',
	  'SCHOOL OF BUSINESS',
	  'HOSPITALITY AND TOURISM',
	  'TECHNOLOGY SCHOOL OF' ]
	*/

```

  
### Todos

  

- Write  Tests

- Add Async mode

  


## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
  

## Credits
I used [@leebyron](https://github.com/leebyron)'s [iterall](https://github.com/leebyron/iterall) package for iterate Arrays and Array-like elements (Maps, NodeLists). So I thank him to creating iterall
  
