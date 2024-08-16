"use client"
import { useState, useEffect } from "react";
import 'abcjs/abcjs-audio.css';
import { useSearchParams } from 'next/navigation'
import LZString from "lz-string";
import {
  Tablature,
} from '../../components/Tablature'
import {ShareModal} from '../../components/Modal'
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Home() {
  const abcjs = require('abcjs');
  const searchParams = useSearchParams()
  var defaultTab = searchParams.get("tabs") || ""
  defaultTab = LZString.decompressFromBase64(decodeURIComponent(defaultTab)) || ""
  const [tabs, setTabs] = useState(JSON.stringify(JSON.parse(defaultTab), undefined, 2));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sharedLink, setSharedLink] = useState("")
  const [compressedTabInfo, setCompressedTabInfo] = useState("")
  const handleShare = () => {
    navigator.clipboard.writeText(sharedLink)
  }
  const [tablatures, setTablatures] = useState<any>([])
  function isJson(str:string) {
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
  }
  
  
  useEffect(() => {
    if(isJson(tabs)){
      var tabsInfo = JSON.parse(tabs)
      var tempTablatures = []
      for(var i = 0; i < tabsInfo.length; i++) {
        tempTablatures.push(
          (
            <div title={`${i}`} onClick={(e) => {
              if(tabsInfo[e.currentTarget.title].def == "push"){
                tabsInfo[e.currentTarget.title].def = "pull"
              }else if(tabsInfo[e.currentTarget.title].def == "pull"){
                tabsInfo[e.currentTarget.title].def = "push"
              }
              setTabs(JSON.stringify(tabsInfo, undefined, 2))
            }}>
              <Tablature input={tabsInfo[i]} style={{
                size: "15px",
                width: "200px",
                border: "1px solid"
              }} key={i} />

            </div>
            
          )
          )
      }
      setTablatures(tempTablatures)
      var tabString = LZString.compressToBase64(JSON.stringify(tabsInfo));
      setSharedLink(`https://cylin743.github.io/concertina-abc-player/tablature?tabs=${encodeURIComponent(tabString)}`)

    }
    
  }, [tabs])

  
  return (
    <main>
      <div id ="tab-page">
      <h1>Anglo Concertina Tablature</h1>
        <Button onClick={handleOpen}>Share</Button>
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
              value={tabs}
              onChange={(e) => setTabs(e.target.value)}
              style={InputStyle}
            ></textarea>
          </AccordionDetails>
        </Accordion>
        <div style={tablaturePageStyle as React.CSSProperties}>
          {tablatures}
        </div>
        <ShareModal
        isOpen={open}
        onClose={handleClose}
        link={sharedLink}
        onCopy={handleShare}
      />
      </div>
    </main>
  );
}

const InputStyle = {
  padding: "12px 10px",
  width: "90%",
  height: "250px",
}
const tablaturePageStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap"

}

