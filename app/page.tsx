"use client"
import { useState, useEffect, useRef } from "react";
import 'abcjs/abcjs-audio.css';
import { useSearchParams } from 'next/navigation'
import LZString from "lz-string";
import {ShareModal} from '../components/Modal'
import {
  Tablature,
  getScaleAfterKeyConvert,
  scalePushList,
  scalePullList,
} from '../components/Tablature'
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';





export default function Home() {
  const abcjs = require('abcjs');
  const searchParams = useSearchParams()
  var defaultTune = searchParams.get("t") || ""
  if ( defaultTune == ""){
    defaultTune = searchParams.get('tune') || ""
    defaultTune = atob(defaultTune)
  }else{
    defaultTune = LZString.decompressFromBase64(decodeURIComponent(defaultTune)) || ""
  }
  const [key, setKey] = useState("C");
  const [tune, setTune] = useState(defaultTune);
  const [open, setOpen] = useState(false)
  const [synthController, setSynthController] = useState<any>(null)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [sharedLink, setSharedLink] = useState("")
  const [displayPointer, setDisplayPointer] = useState(false)
  const inputRef = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0)
  const [tab, setTab] = useState<any>({
    def: "push",
    scales: []
  })
  const [compressedTabInfo, setCompressedTabInfo] = useState("")
  const handleShare = () => {
    navigator.clipboard.writeText(sharedLink)
  }
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };
  let compressedTune = LZString.compressToBase64(tune);
  
  const CursorControl = class {
    public lastScales: any;
    public lastEls: any;
    public lastWay = ""
    constructor(){
      this.lastScales = []
      this.lastEls = []
      this.lastWay = ""
    }
    colorElements(els:any) {
      var pushCount = 0;
      var pullCount = 0;
      var needPull = false
      var needPush = false
      var tabInfo = {}
      for (var i = 0; i < this.lastEls.length; i++) {
        for (var j = 0; j < this.lastEls[i].length; j++) {
          this.lastEls[i][j].style.color = ""
        }
      }
      var s = []
      for (var i = 0; i < els.length; i++) {
        for (var j = 0; j < els[i].length; j++) {
          els[i][j].style.color = "brown"
          for (var k = 0; k < els[i][j].children.length; k ++){
            if(els[i][j].children[k].dataset.name == "chord" || els[i][j].children[k].dataset.name == "lyric"){
              const t = els[i][j].children[k].textContent.toLowerCase()
              if(t == "push" || t == "r" || t == "]["){
                needPush = true
              }else if(t == "pull" || t == "b" || t == "[]"){
                needPull = true
              }
            }
            s.push(getScaleAfterKeyConvert(key, els[i][j].children[k].dataset.name))
          }
        }
      }
      const pushArray = s.filter(value => scalePushList.includes(value));
      const pullArray = s.filter(value => scalePullList.includes(value));
    
      if(pullArray.length > pushArray.length){
        pushCount = 0
        this.lastWay = "pull"
        tabInfo = {
          def: "pull",
          scales: pullArray
        }
        pullCount++;
      } else if(pullArray.length < pushArray.length) {
        pullCount = 0
        this.lastWay = "push"
        tabInfo = {
          def: "push",
          scales: pushArray
        }
        pushCount++
      } else if(needPull) {
        pushCount = 0
        this.lastWay = "pull"
        tabInfo = {
          def: "pull",
          scales: pullArray
        }
        pullCount++;
      }else if(needPush) {
        pullCount = 0
        this.lastWay = "push"
        tabInfo = {
          def: "push",
          scales: pushArray
        }
        pushCount++
    
      }else{
        if((this.lastWay === "pull" && pullCount < 5) || pushCount > 4){
          pushCount = 0
          this.lastWay = "pull"
          tabInfo = {
            def: "pull",
            scales: pullArray
          }
          pullCount++;
        }else{
          pullCount = 0
          this.lastWay = "push"
          tabInfo = {
            def: "push",
            scales: pushArray
          }
          pushCount++
        }
    
      }
      this.lastEls = els;
      return tabInfo
    }
    onStart = ()=>{
    }
    onStop = ()=>{}
    onFinished = ()=>{
    }
    onBeat = ()=>{
    }
    onEvent = (ev:any)=>{
      var tabInfo = this.colorElements(ev.elements)
      setTab(tabInfo)
    }
  }
  
  
  useEffect(() => {
    if(synthController != null){
      synthController.pause()
    }
    compressedTune = LZString.compressToBase64(tune);
    setSharedLink(`https://cylin743.github.io/shamisen-player/?t=${encodeURIComponent(compressedTune)}`)
    // notesInfo = NoteParser(tune)
    const abcObj = abcjs.renderAbc('paper', tune, {
      scale: 1,
      staffwidth: 700,
      paddingleft: 0,
      paddingright: 0,
      responsive: 'resize',
      oneSvgPerLine: true,
      add_classes: true,
    });
    const [visualObj] = abcObj
    var cursorControl = new CursorControl();
    var synthControl = new abcjs.synth.SynthController()
    synthControl.load('#main-midi', cursorControl, {
      displayRestart: true,
      displayPlay: true,
      displayProgress: true,
      displayLoop: true,
      displayWarp: true,
      showCursor: true,
    })
    synthControl.setTune(visualObj, false, {
      soundFontUrl: 'https://gleitz.github.io/midi-js-soundfonts/MusyngKite/',
      programOffsets:{
      },
      millisecondsPerMeasure:1000,
      program: 21,
    });
    setSynthController(synthControl)
    try {
      setKey(abcObj[0].lines[0].staff[0].key.root)
      var timingCallbacks = new abcjs.TimingCallbacks(visualObj, {});
      var tunesSet = []
      var needPull = false
      var needPush = false
      var lastWay = "";
      var pushCount = 0;
      var pullCount = 0;
      for(var i = 0; i < timingCallbacks.noteTimings.length; i++){
        if(!timingCallbacks.noteTimings[i].hasOwnProperty("elements")){
          continue
        }
        var tuneSet = []
        for(var v= 0; v < timingCallbacks.noteTimings[i].elements.length; v++){
          for(var k = 0; k < timingCallbacks.noteTimings[i].elements[v][0].children.length; k++){
            const t = timingCallbacks.noteTimings[i].elements[v][0].children[k].textContent.toLowerCase()
            if(t == "push" || t == "r" || t == "]["){
              needPush = true
            }else if(t == "pull" || t == "b" || t == "[]"){
              needPull = true
            }
            var datastring = timingCallbacks.noteTimings[i].elements[v][0].children[k].dataset.name
            if(datastring.length <= 3){
              var scale = getScaleAfterKeyConvert(abcObj[0].lines[0].staff[0].key.root, datastring)
              tuneSet.push(scale)
            }
          }
        }
        if(tuneSet.length==0){
          continue
        }
        const pushArray = tuneSet.filter(value => scalePushList.includes(value));
        const pullArray = tuneSet.filter(value => scalePullList.includes(value));
        if(pullArray.length > pushArray.length){
          pushCount = 0
          lastWay = "pull"
          pullCount++;
          tunesSet.push({
                "scales": pullArray,
                "def": "pull"
              })
        }else if(pullArray.length < pushArray.length) {
          pullCount = 0
          lastWay = "push"
          pushCount++;
          tunesSet.push({
                "scales": pushArray,
                "def": "push"
              })
        }else if(needPull) {
          pushCount = 0
          lastWay = "pull"
          pullCount++;
          tunesSet.push({
                "scales": pullArray,
                "def": "pull"
              })
        }else if(needPush) {
          pullCount = 0
          lastWay = "push"
          pushCount++;
          tunesSet.push({
                "scales": pushArray,
                "def": "push"
              })
        }else{
          if((lastWay === "pull" && pullCount < 5) || pushCount > 4){
            pushCount = 0
            lastWay = "pull"
            pullCount++;
            tunesSet.push({
                "scales": pullArray,
                "def": "pull"
              })
          }else{
            pullCount = 0
            lastWay = "push"
            pushCount++;
            tunesSet.push({
                "scales": pushArray,
                "def": "push"
              })
          }
        }
      }
      var tabString = LZString.compressToBase64(JSON.stringify(tunesSet));
      setCompressedTabInfo(encodeURIComponent(tabString))
    } catch(e){
      console.log(e)

    }
  }, [tune])

  
  return (
    <main>
      <div id="player-page">
        <h1>Anglo Concertina Player</h1>
        <Button onClick={handleOpen}>Share</Button>
        <Button onClick={()=>openInNewTab(`./tablature?tabs=${compressedTabInfo}`)}>Tablature Page</Button>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ borderColor: '#aaa' }}
          >
            Editor
          </AccordionSummary>
          <AccordionDetails>
            <textarea
              value={tune}
              onChange={(e) => setTune(e.target.value)}
              style={InputStyle}
            ></textarea>
          </AccordionDetails>
        </Accordion>
        <div>
          <div id="main-midi"></div>
          <Tablature input={tab} />
          <div id="paper"></div>
        </div>
      </div>
      
      <ShareModal
        isOpen={open}
        onClose={handleClose}
        link={sharedLink}
        onCopy={handleShare}
      />
    </main>
  );
}

const InputStyle = {
  padding: "12px 10px",
  width: "98%",
  height: "250px",
}

