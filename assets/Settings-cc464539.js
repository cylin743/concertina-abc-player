const r={left:{push:{"E,":"l1a","A,":"l2a","^C":"l3a",A:"l4a","^G":"l5a","C,":"l1","G,":"l2",C:"l3",E:"l4",G:"l5","B,":"l6",D:"l7",B:"l9",d:"l10"},pull:{"F,":"l1a","_B,":"l2a","^D":"l3a",G:"l4a",_B:"l5a","G,":"l1","B,":"l2",D:"l3",F:"l4",A:"l5","A,":"l6","^F":"l7",c:"l9",e:"l10"}},right:{push:{"^c":"r1a",a:"r2a","^g":"r3a","^c'":"r4a","F'":"r5a",c:"r1",e:"r2",g:"r3","c'":"r4","e'":"r5",b:"r7","d'":"r8","g'":"r9","b'":"r10"},pull:{"^d":"r1a",g:"r2a",_b:"r3a","^d'":"r4a","a'":"r5a",B:"r1",d:"r2",f:"r3",b:"r5","^f":"r6",a:"r7","c'":"r8","e'":"r9","^f'":"r10"}}},u=Object.keys(r.right.push).concat(Object.keys(r.left.push));var a={};Object.keys(r.right.push).map(function(l){a[l]=r.right.push[l]});Object.keys(r.left.push).map(function(l){a[l]=r.left.push[l]});const f=a,c=Object.keys(r.right.pull).concat(Object.keys(r.left.pull));var p={};Object.keys(r.right.pull).map(function(l){p[l]=r.right.pull[l]});Object.keys(r.left.pull).map(function(l){p[l]=r.left.pull[l]});const i=p,s=function(l,t){switch(l){case"D":t=="F"&&(t="^F"),t=="f"&&(t="^f"),t=="c"&&(t="^c"),t=="C"&&(t="^C");break;case"G":t=="F"&&(t="^F"),t=="f"&&(t="^f");break;case"F":t=="b"&&(t="_b"),t=="B"&&(t="_B"),t=="B,"&&(t="_B,");break}return t},e=`X: 3
T:Happy Birthday to You
M:3/4
L:1/8
Q:80
K:G
D>D | E2 D2 G2 | F4 D>D | E2 D2 A2 | G4 D>D | d2 B2 G2 | (F2 E2) c>c |
B2 G2 A2 | G6 |]`;export{c as a,i as b,f as c,e as d,s as g,u as s};
