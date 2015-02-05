#PiDoc

Simple Markdown README.md file maker from code

Every module or folder containing modules should have an associated README.md document.  The document should contain:

* title of the module name with associated file e.g. mymodule - index.js
* a Stubs section with each function outlined
* each function should explain what attributes are being passed
* if a function contains internal functions then start an internal stub
* add in your requires

### Automatic Generation

Run the automatic generation from the root of the dev site to build all the README.md file with ``node pidoc.js -f-r FolderName``

Options: 
* -f flag tells the generator to use all .js files in a folder
* -r flag recursivley calls sub folders creating a README.md in each folder

So to target a single folder run ``node pidoc.js -f app/myfolder``

To allow for automatic read me generation then write your comments directly within your module code using the treble slash format and markdown.

### In document markdown example

```javascript

    ///# Heading 1
    ///## Heading 2
    ///### Heading 3
    ///#### Heading 4
		
    ///* Bullet 1
    ///* Bullet 2
	
    ///normal line text - has an extra line break after this line

	///\line text with no line break after
	///so this line appears directly underneat

	///Links are shown with [text to display](http://www.site.com)

```

More details on Markdown can be found at [http://daringfireball.net/projects/markdown/syntax](http://daringfireball.net/projects/markdown/syntax)

### Title example

```javascript
///## mymodule - index.js
///This is my module and it does x, y and z
(function () {      
    //add in the requires

```

### Stub example

```javascript

    ///## Stubs

    ///### decisionTreeUtils.emptyprocess = function (data, shape, callback)
    ///Provides an empty process call for a shape
    ///* data: the data to process
    ///* shape: the shape calling the process
    ///* callback: the function to call on completion, passes back (err, shape) where err should be null if no error thrown
    decisionTreeUtils.emptyprocess = function (data, shape, callback) {
        //just do a callback
        callback(null, shape);
    };

```

### C# example

```C#
    
    /// <markdown>
    ///# PI.Pimail.Models.IMail interface - IMail.cs
    /// </markdown>
    /// <summary>
    /// The IMail interface for a building an email message
    /// </summary>
    public interface IMail
    {
        #region Properties

        /// <markdown>
        /// ###string TagStart { get; set; }
        /// </markdown>
        /// <summary>
        /// The start tag used as a placeholder
        /// </summary>
        string TagStart { get; set; }

		#engregion

        #region Methods

        /// <markdown>
        /// ###void Add(object key, object Value)
        /// </markdown>
        /// <summary>
        /// Adds a key and it's value to the Hash Table
        /// </summary>
        /// <param name="key">Key to add</param>
        /// <param name="Value">Value associated with the key</param>
        void Add(object key, object Value);

		#endregion
```

###Notes:

* Always add in the file name and full Namespace for a class as the main Heading
* Regions are automatically generated as Heading 2 tags.
* Add any markdown code within a markdown tag
* Parameters are bulleted automatically
* Return values are add automatically

It is good to comment as much as possible within a function or module to explain what the code is doing.  

