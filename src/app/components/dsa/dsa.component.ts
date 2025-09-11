import { Component, computed, OnInit, signal } from '@angular/core';

type Pattern = {
  id: string;
  title: string;
  tags: string[];
  whenToUse: string[];
  templateTs: string;
  exampleTs: string;
  realWorld: string;
  impact: string;
};

interface DSAConcept {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  realLifeExample: string;
  softwareExample: string;
  timeComplexity: string;
  spaceComplexity: string;
  keyPoints: string[];
  codeExample: string;
  language: string;
  leetcodeProblems: LeetCodeProblem[];
  tips: string[];
  commonPitfalls: string[];
}

interface LeetCodeProblem {
showSolution?: boolean;
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url: string;
  solution?: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
}

interface CheatSheetItem {
  concept: string;
  timeComplexity: string;
  spaceComplexity: string;
  useCases: string[];
  pros: string[];
  cons: string[];
}

@Component({
  selector: 'app-dsa',
  templateUrl: './dsa.component.html',
  styleUrls: ['./dsa.component.scss'],
  standalone: false
})
export class DsaComponent {
query = signal<string>('');
  activeIds = signal<Set<string>>(new Set());

  readonly tipsAndTricks: string[] = [
    'Read constraints first → hint at O(n) vs O(n log n) vs O(n²).',
    'Name your variables by role: left/right, fast/slow, lo/hi, heap, freq.',
    'Draw tiny traces (5–8 items). It catches off-by-one bugs fast.',
    '“Can I sort? Can I hash?” — Two quickest levers to reduce complexity.',
    'Templates > memorizing full solutions; learn 10 patterns, not 1000 problems.',
    'If order matters → sliding window / two pointers; if global best → heap/greedy.',
    'If answer is monotonic → try binary search on answer.',
    'Use prefix/suffix arrays to turn O(n²) into O(n).',
    'If you need “next greater/smaller” → monotonic stack almost always.',
    'Backtracking: prune early (bounds, counts, sorted check).'
  ];

  // Core pattern library (kept compact but useful)
  readonly patterns = signal<Pattern[]>([
    {
      id: 'sliding-window',
      title: 'Sliding Window',
      tags: ['array','string','O(n)'],
      whenToUse: [
        'Subarray/substring with constraint (length, sum, unique chars)',
        'Continuous segments only'
      ],
      templateTs:
`// Fixed-length window
let sum = 0;
for (let r = 0, l = 0; r < arr.length; r++) {
  sum += arr[r];
  if (r - l + 1 > k) sum -= arr[l++]; // shrink
  // check/update answer when window size == k
}

// Variable-length window with constraint
let best = 0, cnt = 0;
for (let r = 0, l = 0; r < s.length; r++) {
  // expand: update counts / constraint
  while (/* constraint violated */) {
    // shrink from left
    l++;
  }
  best = Math.max(best, r - l + 1);
}`,
      exampleTs:
`// Longest substring with at most K distinct chars
function longestAtMostK(s: string, k: number): number {
  const freq = new Map<string, number>();
  let l = 0, best = 0;

  for (let r = 0; r < s.length; r++) {
    freq.set(s[r], (freq.get(s[r]) ?? 0) + 1);
    while (freq.size > k) {
      const ch = s[l++];
      const f = (freq.get(ch) ?? 0) - 1;
      if (f === 0) freq.delete(ch); else freq.set(ch, f);
    }
    best = Math.max(best, r - l + 1);
  }
  return best;
}`,
      realWorld:
        'Throttle API calls within a moving 1-minute window; detect fraud by monitoring rolling spend per card.',
      impact:
        'Turns O(n²) scanning of all subarrays into O(n). Crucial for high-volume telemetry and rate-limiting.'
    },
    {
      id: 'two-pointers',
      title: 'Two Pointers',
      tags: ['sorted','array','O(n)'],
      whenToUse: [
        'Array is sorted or can be sorted',
        'Need pair/triple meeting sum/diff conditions'
      ],
      templateTs:
`let l = 0, r = arr.length - 1;
while (l < r) {
  const cur = arr[l] + arr[r];
  if (cur === target) { /* found */ break; }
  if (cur < target) l++; else r--;
}`,
      exampleTs:
`// Two-sum in sorted array → return any pair
function twoSumSorted(nums: number[], target: number): [number, number] | null {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const sum = nums[l] + nums[r];
    if (sum === target) return [nums[l], nums[r]];
    sum < target ? l++ : r--;
  }
  return null;
}`,
      realWorld:
        'Find two closest prices that meet a budget, or merge two sorted logs in order.',
      impact:
        'Reduces nested loops to linear passes when order helps. Great for pricing/search pipelines.'
    },
    {
      id: 'fast-slow',
      title: 'Fast & Slow Pointers',
      tags: ['linked-list','cycle'],
      whenToUse: [
        'Cycle detection or middle of list',
        'Iterators where cycle may appear'
      ],
      templateTs:
`let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next; fast = fast.next.next;
  if (slow === fast) { /* cycle */ break; }
}`,
      exampleTs:
`// Detect cycle in linked list
function hasCycle(head: ListNode | null): boolean {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow!.next; fast = fast!.next!.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      realWorld:
        'Detect infinite loops in workflow state transitions or message reprocessing.',
      impact:
        'Finds cycles in O(n) time and O(1) space; useful for stability in job schedulers.'
    },
    {
      id: 'prefix-sum',
      title: 'Hashing / Prefix Sum',
      tags: ['array','map','subarray'],
      whenToUse: [
        'Subarray sum equals K',
        'Transform O(n²) range sums to O(n)'
      ],
      templateTs:
`const seen = new Map<number, number>(); // prefix -> count
seen.set(0, 1);
let prefix = 0, ways = 0;
for (const x of arr) {
  prefix += x;
  ways += (seen.get(prefix - k) ?? 0);
  seen.set(prefix, (seen.get(prefix) ?? 0) + 1);
}`,
      exampleTs:
`// Count subarrays summing to k
function subarraySum(nums: number[], k: number): number {
  const seen = new Map<number, number>(); seen.set(0, 1);
  let prefix = 0, ways = 0;
  for (const x of nums) {
    prefix += x;
    ways += (seen.get(prefix - k) ?? 0);
    seen.set(prefix, (seen.get(prefix) ?? 0) + 1);
  }
  return ways;
}`,
      realWorld:
        'Compute rolling financial metrics, anomaly windows, or KPI deltas instantly.',
      impact:
        'Converts many naive O(n²) checks to O(n), unlocking real-time analytics.'
    },
    {
      id: 'monotonic-stack',
      title: 'Monotonic Stack',
      tags: ['stack','next greater','range'],
      whenToUse: [
        'Next greater/smaller element',
        'Largest area in histogram / range spans'
      ],
      templateTs:
`const st: number[] = []; // store indices
for (let i = 0; i < arr.length; i++) {
  while (st.length && arr[st[st.length-1]] < arr[i]) {
    const j = st.pop()!;
    // arr[j] next greater is i
  }
  st.push(i);
}
// clean up remaining indices as no-next-greater`,
      exampleTs:
`// Daily Temperatures: for each day, days to wait for warmer
function dailyTemperatures(T: number[]): number[] {
  const st: number[] = [];
  const ans = Array(T.length).fill(0);
  for (let i = 0; i < T.length; i++) {
    while (st.length && T[st.at(-1)!] < T[i]) {
      const j = st.pop()!;
      ans[j] = i - j;
    }
    st.push(i);
  }
  return ans;
}`,
      realWorld:
        'Price peaks, CPU spikes → next-higher measurement; UI layout max rectangle calculations.',
      impact:
        'Transforms scanning problems into linear time; essential for perf dashboards.'
    },
    {
      id: 'binary-search-answer',
      title: 'Binary Search on Answer',
      tags: ['binary search','optimization'],
      whenToUse: [
        'Answer is monotonic pass/fail (feasible check)',
        'Minimize max / maximize min'
      ],
      templateTs:
`function feasible(x: number): boolean {
  // can we achieve target with bound x?
  return true;
}
let lo = minPossible, hi = maxPossible, best = hi;
while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  if (feasible(mid)) { best = mid; hi = mid - 1; }
  else lo = mid + 1;
}
return best;`,
      exampleTs:
`// Capacity to ship packages within D days
function shipWithinDays(weights: number[], days: number): number {
  const lo = Math.max(...weights);
  const hi = weights.reduce((a,b)=>a+b,0);
  let L = lo, R = hi, ans = hi;
  const can = (cap: number) => {
    let d = 1, cur = 0;
    for (const w of weights) {
      if (cur + w > cap) { d++; cur = 0; }
      cur += w;
    }
    return d <= days;
  };
  while (L <= R) {
    const m = Math.floor((L+R)/2);
    if (can(m)) { ans = m; R = m - 1; } else L = m + 1;
  }
  return ans;
}`,
      realWorld:
        'Capacity planning: find minimal server throughput to meet SLAs; batch sizing for ETL.',
      impact:
        'Turns hard optimization into log-search with a linear feasibility test.'
    },
    {
      id: 'bfs-dfs',
      title: 'BFS / DFS',
      tags: ['graph','tree','search'],
      whenToUse: [
        'Shortest path in unweighted graph (BFS)',
        'Reachability, components, tree ops (DFS)'
      ],
      templateTs:
`// BFS
const q: number[] = [];
q.push(start);
const dist = new Map<number, number>([[start,0]]);
while (q.length) {
  const u = q.shift()!;
  for (const v of adj[u]) {
    if (!dist.has(v)) { dist.set(v, dist.get(u)!+1); q.push(v); }
  }
}`,
      exampleTs:
`// Number of islands (DFS)
function numIslands(g: string[][]): number {
  const R = g.length, C = g[0]?.length ?? 0;
  const vis = Array.from({length:R},()=>Array(C).fill(false));
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  const inb = (r:number,c:number)=>r>=0&&c>=0&&r<R&&c<C;
  let cnt = 0;
  const dfs = (r:number,c:number)=>{
    vis[r][c]=true;
    for (const [dr,dc] of dirs) {
      const nr=r+dr,nc=c+dc;
      if (inb(nr,nc)&&!vis[nr][nc]&&g[nr][nc]==='1') dfs(nr,nc);
    }
  };
  for (let r=0;r<R;r++) for (let c=0;c<C;c++)
    if (!vis[r][c] && g[r][c]==='1') { cnt++; dfs(r,c); }
  return cnt;
}`,
      realWorld:
        'Service dependency graphs, reachability of microservices, cluster sizing.',
      impact:
        'Core to incident blast-radius analysis and routing.'
    },
    {
      id: 'toposort',
      title: 'Topological Sort (Kahn)',
      tags: ['DAG','ordering','graph'],
      whenToUse: [
        'Dependency ordering with no cycles (DAG)',
        'Build scheduling, course ordering'
      ],
      templateTs:
`const indeg = Array(n).fill(0);
for (let u=0;u<n;u++) for (const v of adj[u]) indeg[v]++;
const q: number[] = [];
for (let i=0;i<n;i++) if (indeg[i]===0) q.push(i);
const order: number[] = [];
while (q.length) {
  const u = q.shift()!;
  order.push(u);
  for (const v of adj[u]) if (--indeg[v]===0) q.push(v);
}
// if order.length < n → cycle`,
      exampleTs:
`// Can finish all tasks?
function canFinish(n: number, edges: number[][]): boolean {
  const adj = Array.from({length:n},()=>[] as number[]);
  const indeg = Array(n).fill(0);
  for (const [a,b] of edges) { // a depends on b: b -> a
    adj[b].push(a); indeg[a]++;
  }
  const q:number[]=[]; for (let i=0;i<n;i++) if (!indeg[i]) q.push(i);
  let seen=0;
  while (q.length) {
    const u=q.shift()!; seen++;
    for (const v of adj[u]) if (--indeg[v]===0) q.push(v);
  }
  return seen===n;
}`,
      realWorld:
        'CI/CD job ordering, Terraform module deploys, database migrations.',
      impact:
        'Prevents deadlocks and enables parallel, safe scheduling.'
    },
    {
      id: 'heap',
      title: 'Heap / Priority Queue',
      tags: ['top-k','scheduling'],
      whenToUse: [
        'Top-K items, running medians',
        'Interval scheduling with end times'
      ],
      templateTs:
`// Min-heap with custom comparator (use a lightweight lib or implement)
class MinHeap<T> {
  private a: T[] = [];
  constructor(private cmp: (x:T,y:T)=>number) {}
  push(x:T){this.a.push(x);this.bubbleUp(this.a.length-1);}
  pop():T|undefined{if(!this.a.length)return;this.swap(0,this.a.length-1);
    const v=this.a.pop()!;this.bubbleDown(0);return v;}
  peek(){return this.a[0];}
  private bubbleUp(i:number){while(i>0){const p=(i-1>>1);
    if(this.cmp(this.a[i],this.a[p])>=0)break;this.swap(i,p);i=p;}}
  private bubbleDown(i:number){for(;;){let s=i,l=i*2+1,r=i*2+2;
    if(l<this.a.length&&this.cmp(this.a[l],this.a[s])<0)s=l;
    if(r<this.a.length&&this.cmp(this.a[r],this.a[s])<0)s=r;
    if(s===i)break;this.swap(i,s);i=s;}}
  private swap(i:number,j:number){[this.a[i],this.a[j]]=[this.a[j],this.a[i]];}
  get size(){return this.a.length;}
}`,
      exampleTs:
`// Top K frequent elements
function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);
  const heap = new MinHeap<[number, number]>((x,y)=>x[1]-y[1]);
  for (const [val, f] of freq.entries()) {
    heap.push([val, f]);
    if (heap.size > k) heap.pop();
  }
  const out: number[] = [];
  while (heap.size) out.push(heap.pop()![0]);
  return out.reverse();
}`,
      realWorld:
        'Top-K slow endpoints, error codes, or search queries; task schedulers by next deadline.',
      impact:
        'Keeps memory bounded; supports real-time ranking and SLA scheduling.'
    },
    {
      id: 'intervals',
      title: 'Greedy Intervals',
      tags: ['greedy','intervals'],
      whenToUse: [
        'Max meetings non-overlap; min rooms; merge intervals',
        'Pick by earliest finish or smallest next conflict'
      ],
      templateTs:
`// Max non-overlapping intervals by earliest end
intervals.sort((a,b)=>a[1]-b[1]);
let cnt = 0, end = -Infinity;
for (const [s,e] of intervals) {
  if (s >= end) { cnt++; end = e; }
}`,
      exampleTs:
`// Minimum meeting rooms
function minMeetingRooms(intervals: number[][]): number {
  const starts = intervals.map(i=>i[0]).sort((a,b)=>a-b);
  const ends = intervals.map(i=>i[1]).sort((a,b)=>a-b);
  let i=0,j=0,rooms=0,peak=0;
  while (i<starts.length) {
    if (starts[i] < ends[j]) { rooms++; peak=Math.max(peak,rooms); i++; }
    else { rooms--; j++; }
  }
  return peak;
}`,
      realWorld:
        'Room/CPU slot allocation; compaction windows; cron load shaping.',
      impact:
        'Simple greedy rules often optimal; huge perf wins in schedulers.'
    },
    {
      id: 'dp',
      title: 'Dynamic Programming (1D/2D)',
      tags: ['dp','optimization'],
      whenToUse: [
        'Optimal substructure + overlapping subproblems',
        'Knapsack, edit distance, paths in grid'
      ],
      templateTs:
`// Bottom-up 1D example
const dp = Array(n+1).fill(0);
for (let i=1;i<=n;i++) {
  dp[i] = Math.max(dp[i-1], /* transition */ );
}`,
      exampleTs:
`// 0/1 Knapsack (value max)
function knap(values: number[], weights: number[], W: number): number {
  const dp = Array(W+1).fill(0);
  for (let i = 0; i < values.length; i++) {
    for (let w = W; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  return dp[W];
}`,
      realWorld:
        'Budget allocation across features; picking tests to run under time limits.',
      impact:
        'Turns “exponential choices” into polynomial by reusing subresults.'
    },
    {
      id: 'union-find',
      title: 'Union-Find (Disjoint Set)',
      tags: ['graph','components'],
      whenToUse: [
        'Connectivity, cycles in undirected graph',
        'Kruskal MST'
      ],
      templateTs:
`class DSU {
  p: number[]; r: number[];
  constructor(n:number){ this.p=Array.from({length:n},(_,i)=>i); this.r=Array(n).fill(0); }
  find(x:number){ return this.p[x]===x?x:(this.p[x]=this.find(this.p[x])); }
  union(a:number,b:number){
    a=this.find(a); b=this.find(b); if(a===b) return false;
    if(this.r[a]<this.r[b]) [a,b]=[b,a];
    this.p[b]=a; if(this.r[a]===this.r[b]) this.r[a]++; return true;
  }
}`,
      exampleTs:
`// Count connected components 0..n-1
function countComponents(n:number, edges:number[][]): number {
  const dsu = new DSU(n);
  for (const [u,v] of edges) dsu.union(u,v);
  const seen = new Set<number>();
  for (let i=0;i<n;i++) seen.add(dsu.find(i));
  return seen.size;
}`,
      realWorld:
        'Network partition detection; user-group connectivity; feature rollout islands.',
      impact:
        'Near-O(1) amortized merges/finds at scale; great for streaming graphs.'
    },
    {
      id: 'trie',
      title: 'Trie',
      tags: ['string','prefix','search'],
      whenToUse: [
        'Prefix queries, autocomplete, dictionary',
        'Bitwise tries for max XOR'
      ],
      templateTs:
`class Trie {
  children = new Map<string, Trie>();
  end = false;
  insert(w:string){ let cur=this; for (const ch of w) {
    if(!cur.children.has(ch)) cur.children.set(ch,new Trie());
    cur = cur.children.get(ch)!;
  } cur.end = true; }
  startsWith(p:string){ let cur=this; for (const ch of p) {
    if(!cur.children.has(ch)) return false; cur = cur.children.get(ch)!; }
    return true; }
}`,
      exampleTs:
`// Autocomplete hits
function autocomplete(words: string[], prefix: string): string[] {
  const root = new Trie(); for (const w of words) root.insert(w);
  // quick scan from root to collect (bounded to keep demo short)
  const out: string[] = [];
  function dfs(node: Trie, path: string) {
    if (out.length >= 10) return;
    if (node.end) out.push(path);
    for (const [ch, nxt] of node.children) dfs(nxt, path + ch);
  }
  // descend to prefix
  let cur: Trie = root;
  for (const ch of prefix) {
    const nxt = cur.children.get(ch); if (!nxt) return [];
    cur = nxt;
  }
  dfs(cur, prefix);
  return out;
}`,
      realWorld:
        'Search box autocomplete, command palettes, routing prefix matches.',
      impact:
        'Predictable latency for prefix lookups; improves UX and query throughput.'
    }
  ]);

  // UI filtering
  filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.patterns();
    return this.patterns().filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.whenToUse.some(w => w.toLowerCase().includes(q)) ||
      p.realWorld.toLowerCase().includes(q) ||
      p.impact.toLowerCase().includes(q)
    );
  });

  toggle(id: string) {
    const next = new Set(this.activeIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.activeIds.set(next);
  }

  copy(text: string, el?: HTMLElement) {
    navigator.clipboard.writeText(text).then(() => {
      if (!el) return;
      el.classList.add('copied');
      setTimeout(() => el.classList.remove('copied'), 900);
    });
  }

  tagClick(tag: string) {
    const cur = this.query();
    const t = tag.toLowerCase();
    if (!cur.toLowerCase().includes(t)) this.query.set(cur ? `${cur} ${t}` : t);
  }
}