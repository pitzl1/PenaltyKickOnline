function CSelectTeamMenu(){var e,t,i,n,s,a,o,l,r,_,d,h=null,c=null,u=this;this._init=function(){r=new createjs.Container,s_oStage.addChild(r);var u=createBitmap(s_oSpriteLibrary.getSprite("bg_levelselect"));r.addChild(u);var S=new createjs.Shape;S.graphics.beginFill("#000").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT),S.alpha=.5,r.addChild(S),_=new createjs.Container,r.addChild(_);var A=s_oSpriteLibrary.getSprite("msg_box"),M=createBitmap(A);M.x=CANVAS_WIDTH_HALF,M.y=CANVAS_HEIGHT_HALF+30,M.regX=.5*A.width,M.regY=.5*A.height,_.addChild(M);var g=new createjs.Text(TEXT_SELECT_TEAM,"50px "+PRIMARY_FONT,TEXT_COLOR);g.x=CANVAS_WIDTH_HALF,g.y=80,g.textAlign="center",g.textBaseline="alphabetic",g.shadow=new createjs.Shadow("#000000",2,2,4),_.addChild(g),(d=new createjs.Text(TEXT_WAIT_OPPONENT,"70px "+PRIMARY_FONT,TEXT_COLOR)).x=CANVAS_WIDTH_HALF,d.y=CANVAS_HEIGHT_HALF,d.textAlign="center",d.textBaseline="alphabetic",d.shadow=new createjs.Shadow("#000000",2,2,4),r.addChild(d),(l=new createjs.Container).x=CANVAS_WIDTH_HALF+44,l.y=CANVAS_HEIGHT_HALF+33,_.addChild(l),e=new Array;for(var T=4,E=45,f=0;f<NUM_TEAMS;f++){var b=new CButTeam(T,E,f,l);b.addEventListener(ON_MOUSE_UP,this._onSelectFlag,this),e[f]=b,f>0&&(f+1)%8==0?(T=4,E+=120):T+=108}l.regX=l.getBounds().width/2,l.regY=l.getBounds().height/2;var w=s_oSpriteLibrary.getSprite("but_exit");t={x:CANVAS_WIDTH-w.height/2-10,y:w.height/2+10},(s=new CGfxButton(t.x,t.y,w,s_oStage)).addEventListener(ON_MOUSE_UP,this._onExit,this),!1!==DISABLE_SOUND_MOBILE&&!1!==s_bMobile||(i={x:s.getX()-w.width-10,y:w.height/2+10},(a=new CToggle(i.x,i.y,s_oSpriteLibrary.getSprite("audio_icon"),s_bAudioActive)).addEventListener(ON_MOUSE_UP,this._onAudioToggle,this));var v=window.document,m=v.documentElement;h=m.requestFullscreen||m.mozRequestFullScreen||m.webkitRequestFullScreen||m.msRequestFullscreen,c=v.exitFullscreen||v.mozCancelFullScreen||v.webkitExitFullscreen||v.msExitFullscreen,!1===ENABLE_FULLSCREEN&&(h=!1),h&&screenfull.enabled&&(w=s_oSpriteLibrary.getSprite("but_fullscreen"),n={x:w.width/4+10,y:t.y},(o=new CToggle(n.x,n.y,w,s_bFullscreen,s_oStage)).addEventListener(ON_MOUSE_UP,this._onFullscreenRelease,this)),s_bMultiplayer?(s_oNetworkManager.addEventListener(ON_STATUS_OFFLINE,this._onConnectionCrashed,this),d.visible=!1):d.visible=!1,this.refreshButtonPos()},this.unload=function(){for(var t=0;t<e.length;t++)e[t].unload();!1!==DISABLE_SOUND_MOBILE&&!1!==s_bMobile||(a.unload(),a=null),h&&screenfull.enabled&&o.unload(),s.unload(),s=null,s_oStage.removeAllChildren(),s_oSelectMenu=null},this.opponentLeaveTheGame=function(){_.visible=!1,d.visible=!0,d.text=TEXT_OPPONENT_LEFT},this.refreshButtonPos=function(){s.setPosition(t.x-s_iOffsetX,t.y+s_iOffsetY),!1!==DISABLE_SOUND_MOBILE&&!1!==s_bMobile||a.setPosition(i.x-s_iOffsetX,s_iOffsetY+i.y),h&&screenfull.enabled&&o.setPosition(n.x+s_iOffsetX,n.y+s_iOffsetY)},this._onAudioToggle=function(){Howler.mute(s_bAudioActive),s_bAudioActive=!s_bAudioActive},this._onExit=function(){this.unload(),s_oMain.gotoMenu(),s_oNetworkManager.disconnect()},this.resetFullscreenBut=function(){h&&screenfull.enabled&&o.setActive(s_bFullscreen)},this._onFullscreenRelease=function(){s_bFullscreen?c.call(window.document):h.call(window.document.documentElement),sizeHandler()},this._onSelectFlag=function(e){if(s_bMultiplayer)if(s_iTeamSelected=e,_.visible=!1,d.visible=!0,s_bPlayWithBot)setTimeout((function(){s_oSelectMenu.onGameStart([e])}),1e3+1e3*Math.random());else{var t={iTeamIndex:e,playerID:s_oNetworkManager.getPlayerOrderID()};s_oNetworkManager.sendMsg(MSG_TEAM_SELECTED,JSON.stringify(t))}else u.unload(),s_oMain.saveTeam(e),s_oMain.gotoLevelPanel()},this.gotoTeamSelect=function(t){e[t].block(!0),e[t].setAlpha(.3),_.visible=!0,d.visible=!1},this.onGameStart=function(e){if(this.unload(),s_aMatches=new Array,s_bPlayWithBot){var t;do{t=Math.floor(Math.random()*NUM_TEAMS)}while(t===s_iTeamSelected);var i=5+Math.floor(4*Math.random());s_aMatches[i-1]=t,s_oMain.gotoGameWithBot(i)}else{if(e[0]===e[1]){var n=this._chooseRandomTeamExcept(e[0]);e[0]=n,e[1]=n}s_oNetworkManager.isUserA()?s_aMatches.push(e[1]):s_aMatches.push(e[0]),s_oMain.gotoGameMulti()}},this._chooseRandomTeamExcept=function(e){for(var t=new Array,i=0;i<NUM_TEAMS-1;i++)i!==e&&t.push(i);return t[Math.floor(Math.random()*t.length)]},this._onConnectionCrashed=function(){s_oNetworkManager.disconnect(),this.unload(),s_oMain.gotoOfflineMenu()},s_oSelectMenu=this,this._init()}var s_oSelectMenu=null;