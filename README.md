# BadDOM
the smallest component renderer
<h1>Introducing: Bad-DOM - the smallest<sup>*</sup> component renderer</h1>

<span><sup>*</sup>seriously, it's 592 bytes minified + gzipped</span>

<h2>What does it do?</h2>
<p>Bad-DOM is a lazy diffing algorithm and HTML component renderer. It's lazy because it doesn't try too hard to keep the browser from doing unnecessary work, but still does a pretty good job.</p>
<p>Bad-DOM exposes a single function, <code>vDiff</code>, which takes 2 parameters. The first being an existing element on the page, and the second being a template string representing the markup you would like to replace the first item with.
</p>
<p>Calling this function will result in parameter 1 being replaced by parameter 2, with the goal of the least amount of changes taking place in the DOM in order to achieve that replacement. Here's what that would look like using some "hello world" text in a p tag:</p>
<p>
<code>vDiff(document.querySelector('.hello-world-demo'), `&lt;p class="hello-world-demo"&gt;GoodBye!&lt;/p&gt;`)</code>
</p>
<p>In this example, we're taking an element from the page (a paragraph tag with text in it that says "hello world!") and changing the text inside it. Bad-DOM knows not to change anything other than the text, because it can tell that nothing else has changed.</p>
<h2>What else does it do?</h2>
<p>Since Bad-DOM takes a template string as its second parameter, it becomes a fully capable component renderer as well.</p>
<p>For example, given an html page with an empty element: <code>&lt;div id="My-App"&gt;&lt;/div&gt;</code></p>
<p>We can render markup into our My-App container:
<pre>
<code>
const name = 'Tim';
vDiff(document.querySelector('#My-App'), `&lt;div id="My-App"&gt;Hello, ${name}&lt;/div&gt;`);
</code>	
</pre>
</p>
<p>An example of this behavior can be found <a href="https://s.codepen.io/tevko/debug/LzXjKE#slider">here</a>, wherein a working image slider is being rendered into the dom and transitioned based on a counter state. 
<p>Here's the code necessary to render the slider:
<pre>
<code>
document.querySelector('button').addEventListener('click', () => {
  x = (x === 3 ? 0 : x + 1);
  vDiff(document.querySelector('section'),
	  `&lt;section&gt;
	    &lt;img style=&quot;display:${x === 1 ? 'block' : 'none'}&quot; src=&quot;https://placeimg.com/700/200/tech&quot; alt=&quot;phones p much&quot;&gt;
	    &lt;img style=&quot;display:${x === 2 ? 'block' : 'none'}&quot; src=&quot;https://placeimg.com/700/200/people&quot; alt=&quot;peeps&quot;&gt;
	    &lt;img style=&quot;display:${x === 0 ? 'block' : 'none'}&quot; src=&quot;https://placeimg.com/700/200/animals&quot; alt=&quot;woofers&quot;&gt;
	    &lt;img style=&quot;display:${x === 3 ? 'block' : 'none'}&quot; src=&quot;https://placeimg.com/700/200/nature&quot; alt=&quot;outside&quot;&gt;
	  &lt;/section&gt;`
	);
});
</code>	
</pre>
</p>
<h2>Why should I use this thing?</h2>
<p>Since Bad-DOM is a fully capable component renderer, you can use it to build fully capable UI's. An example is provided here: <a href="https://codepen.io/tevko/pen/MrwXdy" >https://codepen.io/tevko/pen/MrwXdy</a>.</p>
<p>For the above demo application to work, all we need to do is include the Bad-DOM library, provide a render target, and feed the vDiff function a template string. After the initial rendering takes place, the inline event handlers reference functions that update the global app state and rebuild the template string. No more DOM manipulation, render-hacks, or confusing framework methods to memorize.</p>
<p>Overall, you can use Bad-DOM to build powerful components as long as you provide your own state management and event systems. In the counter demo referenced above, basic inline html events are being used, while each callback function is only responsible for updating the application state and calling the render function. Essentially, Bad-DOM's advantage is that it doesn't keep any internal memory, but is still able to intelligently update the DOM based on whatever source it is given. Since Bad-DOM doesn't provide any reoccuring update functionality (you need to tell it to re-render explicitly) your application will be less likely to fall into common performance pitfalls seen with other component renderers. </p>
<h2>Conclusion</h2>
<ul>
	<li>Bad-DOM is fast.</li>
	<li>Bad-DOM is small.</li>
	<li>Bad-DOM is incredibly easy to use.</li>
</ul>
