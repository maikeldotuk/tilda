function changeTextTop() {
  // TODO: Should be renamed to the real name of what is changing, it's also too long break it. 
  const whatsOnYourMind = document.querySelectorAll('textarea')[0]
  if (whatsOnYourMind && whatsOnYourMind.placeholder.indexOf("on your") !== -1  ) {
    const endname = whatsOnYourMind.placeholder.split(' ')[4]
    whatsOnYourMind.placeholder = "What of your secrets can I sell today, " + endname
  }
  const picTop = document.querySelector('._mp3 > img:nth-child(1)')
  if (picTop) {
    picTop.src = "https://scontent-lht6-1.xx.fbcdn.net/v/t34.0-1/p160x160/" +
      "16176889_112685309244626_578204711_n.jpg?_nc_cat=1&_nc_ht=scontent-lh" + 
      "t6-1.xx&oh=e849ed09522244d0f75e3db0a0c858f6&oe=5C59F9E3" 
  }
}

/* Stuff to remove. Maybe it's worth thinking in loading this from a .json file as that would mean
** you could reuse it for many different websites
*/
const crapToRemove = [
  '#findFriendsNav',
  '#fbDockChatBuddylistNub',
  '#createNav',
  '#u_0_d',
  '#u_0_h',
  '#u_ps_0_0_0',
  '#u_ps_jsonp_10_0_0',
  '#pagelet_pymk_timeline',
  '._57fp > div:nth-child(1)',
  '#u_ps_jsonp_10_0_0',
  '.escapeHatchMinimal',
  '#pagelet_pymk_timeline',
  '#pagelet_rhc_footer',
  '#findFriendsNav',
  '#js_9r',
  '._59fc',
  '#pagelet_ego_pane'
]

function removeCrap() {
  for (const crapID of crapToRemove) {
    removeElementIfExists(crapID)
 }
}

function removeElementIfExists(crapID) {
    const elem = document.querySelector(crapID)
    if (elem) elem.remove()
}

/* Only useful in Firefox, not chrome, Chrome uses chrome.extension */
let compatibility
try {
	compatibility = chrome
} catch(e)  {
  compatibility = browser
}

const pathToImage = compatibility.extension.getURL("images/zucky.jpg")
const loadingImage = compatibility.extension.getURL("images/idtheft.gif")

/* Maybe you should read this from a file */
const htmldata = `
  <h1>Facebook Cleaned</h1>
  <p>All the next elements have been deleted</p>
  <ol>
    <li>Find friends</li>
    <li>Help &amp; Chat buttons</li>
    <li>Chat box</li>
    <li>Create ads or page links</li>
    <li>People you might know from your profile</li>
  </ol>
  <h2>Coming soon</h2>
  <ol>
    <li>Remove People You might know from the wall</li>
    <li>Avoid ads</li>
    <li>Show the weather here</li>
  </ol>
`

function addEvilZucky() {
  try {  
    if (!document.querySelector('#zucky')) {
      console.log('Adding Zucky')
      const contentCol = document.querySelector('#contentArea')
      const newImage = document.createElement('img')
      newImage.src = pathToImage
      newImage.id = 'zucky'
      newImage.width = document.querySelector('#pagelet_composer').clientWidth
      const text = document.createElement('h1')
      text.style = 'color: white; font-size: 30px; background-color: #000000; position: relative; margin-top: -50px;margin-left: 10px;opacity: 0.6'
      text.innerText = 'No privacy for you'
      contentCol.insertBefore(text, contentCol.firstChild)
      contentCol.insertBefore(newImage, contentCol.firstChild)
    }
  } 
  catch (e) {
    console.log('Zucky is not there')
  }
}

function removeAndChangeRightCol() {
  const storiesTray = document.querySelector('#stories_tray') 
  if (storiesTray) {
    storiesTray.children[0].children[0].innerText = 'Deleted Stuff'
    storiesTray.children[1].children[0].removeAttribute('data-tooltip-content')
    storiesTray.children[0].children[0].href = 'https://github.com/maikeldotuk/zuckerbox'
    const archiveLink = storiesTray.children[0].children[1]
    if (archiveLink) archiveLink.remove()
    storiesTray.children[1].innerHTML = htmldata
  }
}

function changeNavBar() {
  const navBar = document.querySelector('#universalNav')
  if (!navBar) return
  navBar.children[0].children[0].children[1].children[1].innerText = "Fake News"
  navBar.children[0].children[1].children[0].children[1].innerText = "Pointless Chat"
  document.querySelector('._5qtp').innerText = "Make Mark Richer"
  document.title = "Zuckerbox"
  if (navBar.children[0].children.length > 2) {
    navBar.children[0].children[2].remove()
    navBar.children[0].children[2].remove()
  }
  document.querySelectorAll('._2aha')[0].innerText = "Face ID"
  document.querySelectorAll('._2aha')[1].innerText = "Victims"
  document.querySelectorAll('div._5xmp')[2].remove()
}

function reDrawDOM() {
    removeAndChangeRightCol()
    changeTextTop()
    changeNavBar()
    removeCrap()
    addEvilZucky()
}

const body = document.querySelector('body')
const imageContainer = document.createElement('div')
imageContainer.style = "display: flex;justify-content: center;width: 100%;margin: 0;padding: 0;position: absolute;background-color: #4267b2 ;height: 100%;"
imageContainer.id = 'ldngImID'

function addLoading() {
  body.insertBefore(imageContainer, body.firstChild)
  window.scrollTo(0,0)
}

function removeLoading() {
  document.querySelector('#ldngImID').remove()
}

let prevURL = document.location.href
let newURL

function delayedDraw() {
    document.querySelector('body').firstChild.style.opacity = 0.0
    addLoading()
    setTimeout(() => {
      reDrawDOM()
      removeLoading()
      document.querySelector('body').firstChild.style.opacity = 1
      prevURL = newURL
    }, 2000)
}

function checkURL() {
  setTimeout(() => {
    newURL = document.location.href
    console.log(newURL)
    if (newURL !== prevURL) {
      console.log('URL has changed')
      delayedDraw()      
    }
  }, 200)
}

document.addEventListener('click', checkURL)

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    sendResponse({message: "goodbye"})
    reDrawDOM()
 }
)
