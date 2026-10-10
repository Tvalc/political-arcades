// Only add verified, edited, hosted clips. Empty means no public teaser or dead button.
export const realMoments=[];
export function renderRealMoment(container,leader){
 container.replaceChildren();container.hidden=true;
 const moment=realMoments.find(m=>m.hero===leader&&m.video&&m.title&&m.source);
 if(!moment)return;
 const title=document.createElement('h3');title.textContent='Watch the real moment';
 const video=document.createElement('video');video.controls=true;video.preload='none';video.playsInline=true;video.src=moment.video;if(moment.poster)video.poster=moment.poster;
 const caption=document.createElement('p');caption.textContent=moment.title;
 const source=document.createElement('a');source.href=moment.source;source.textContent='Original source';source.target='_blank';source.rel='noopener noreferrer';
 container.append(title,video,caption,source);container.hidden=false;
}
