function GROWABLE_HEAP_I8() {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAP8;
}

function GROWABLE_HEAP_U8() {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAPU8;
}

function GROWABLE_HEAP_I16() {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAP16;
}

function GROWABLE_HEAP_U16() {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAPU16;
}

function GROWABLE_HEAP_I32() {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAP32;
}

function GROWABLE_HEAP_U32() {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAPU32;
}

function GROWABLE_HEAP_F32() {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAPF32;
}

function GROWABLE_HEAP_F64() {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAPF64;
}

var Module = typeof Module != "undefined" ? Module : {};

var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = (status, toThrow) => {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = typeof window == "object";

var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";

var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";

var ENVIRONMENT_IS_PTHREAD = Module["ENVIRONMENT_IS_PTHREAD"] || false;

var _scriptDir = typeof document != "undefined" && document.currentScript ? document.currentScript.src : undefined;

if (ENVIRONMENT_IS_WORKER) {
 _scriptDir = self.location.href;
} else if (ENVIRONMENT_IS_NODE) {
 _scriptDir = __filename;
}

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary, setWindowTitle;

function logExceptionOnExit(e) {
 if (e instanceof ExitStatus) return;
 let toLog = e;
 err("exiting due to exception: " + toLog);
}

if (ENVIRONMENT_IS_NODE) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = require("path").dirname(scriptDirectory) + "/";
 } else {
  scriptDirectory = __dirname + "/";
 }
 var fs, nodePath;
 if (typeof require === "function") {
  fs = require("fs");
  nodePath = require("path");
 }
 read_ = (filename, binary) => {
  filename = nodePath["normalize"](filename);
  return fs.readFileSync(filename, binary ? undefined : "utf8");
 };
 readBinary = filename => {
  var ret = read_(filename, true);
  if (!ret.buffer) {
   ret = new Uint8Array(ret);
  }
  return ret;
 };
 readAsync = (filename, onload, onerror) => {
  filename = nodePath["normalize"](filename);
  fs.readFile(filename, function(err, data) {
   if (err) onerror(err); else onload(data.buffer);
  });
 };
 if (process["argv"].length > 1) {
  thisProgram = process["argv"][1].replace(/\\/g, "/");
 }
 arguments_ = process["argv"].slice(2);
 if (typeof module != "undefined") {
  module["exports"] = Module;
 }
 process["on"]("uncaughtException", function(ex) {
  if (!(ex instanceof ExitStatus)) {
   throw ex;
  }
 });
 process["on"]("unhandledRejection", function(reason) {
  throw reason;
 });
 quit_ = (status, toThrow) => {
  if (keepRuntimeAlive()) {
   process["exitCode"] = status;
   throw toThrow;
  }
  logExceptionOnExit(toThrow);
  process["exit"](status);
 };
 Module["inspect"] = function() {
  return "[Emscripten Module object]";
 };
 let nodeWorkerThreads;
 try {
  nodeWorkerThreads = require("worker_threads");
 } catch (e) {
  console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?');
  throw e;
 }
 global.Worker = nodeWorkerThreads.Worker;
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (typeof document != "undefined" && document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 if (!ENVIRONMENT_IS_NODE) {
  read_ = url => {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, false);
   xhr.send(null);
   return xhr.responseText;
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = url => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    return new Uint8Array(xhr.response);
   };
  }
  readAsync = (url, onload, onerror) => {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = () => {
    if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
     onload(xhr.response);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
 setWindowTitle = title => document.title = title;
} else {}

if (ENVIRONMENT_IS_NODE) {
 if (typeof performance == "undefined") {
  global.performance = require("perf_hooks").performance;
 }
}

var defaultPrint = console.log.bind(console);

var defaultPrintErr = console.warn.bind(console);

if (ENVIRONMENT_IS_NODE) {
 defaultPrint = str => fs.writeSync(1, str + "\n");
 defaultPrintErr = str => fs.writeSync(2, str + "\n");
}

var out = Module["print"] || defaultPrint;

var err = Module["printErr"] || defaultPrintErr;

Object.assign(Module, moduleOverrides);

moduleOverrides = null;

if (Module["arguments"]) arguments_ = Module["arguments"];

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

if (Module["quit"]) quit_ = Module["quit"];

var Atomics_load = Atomics.load;

var Atomics_store = Atomics.store;

var Atomics_compareExchange = Atomics.compareExchange;

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

var noExitRuntime = Module["noExitRuntime"] || true;

if (typeof WebAssembly != "object") {
 abort("no native wasm support detected");
}

var wasmMemory;

var wasmModule;

var ABORT = false;

var EXITSTATUS;

function assert(condition, text) {
 if (!condition) {
  abort(text);
 }
}

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;

function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
  return UTF8Decoder.decode(heapOrArray.buffer instanceof SharedArrayBuffer ? heapOrArray.slice(idx, endPtr) : heapOrArray.subarray(idx, endPtr));
 }
 var str = "";
 while (idx < endPtr) {
  var u0 = heapOrArray[idx++];
  if (!(u0 & 128)) {
   str += String.fromCharCode(u0);
   continue;
  }
  var u1 = heapOrArray[idx++] & 63;
  if ((u0 & 224) == 192) {
   str += String.fromCharCode((u0 & 31) << 6 | u1);
   continue;
  }
  var u2 = heapOrArray[idx++] & 63;
  if ((u0 & 240) == 224) {
   u0 = (u0 & 15) << 12 | u1 << 6 | u2;
  } else {
   u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
  }
  if (u0 < 65536) {
   str += String.fromCharCode(u0);
  } else {
   var ch = u0 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  }
 }
 return str;
}

function UTF8ToString(ptr, maxBytesToRead) {
 return ptr ? UTF8ArrayToString(GROWABLE_HEAP_U8(), ptr, maxBytesToRead) : "";
}

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | u1 & 1023;
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   heap[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   heap[outIdx++] = 192 | u >> 6;
   heap[outIdx++] = 128 | u & 63;
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   heap[outIdx++] = 224 | u >> 12;
   heap[outIdx++] = 128 | u >> 6 & 63;
   heap[outIdx++] = 128 | u & 63;
  } else {
   if (outIdx + 3 >= endIdx) break;
   heap[outIdx++] = 240 | u >> 18;
   heap[outIdx++] = 128 | u >> 12 & 63;
   heap[outIdx++] = 128 | u >> 6 & 63;
   heap[outIdx++] = 128 | u & 63;
  }
 }
 heap[outIdx] = 0;
 return outIdx - startIdx;
}

function stringToUTF8(str, outPtr, maxBytesToWrite) {
 return stringToUTF8Array(str, GROWABLE_HEAP_U8(), outPtr, maxBytesToWrite);
}

function lengthBytesUTF8(str) {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var c = str.charCodeAt(i);
  if (c <= 127) {
   len++;
  } else if (c <= 2047) {
   len += 2;
  } else if (c >= 55296 && c <= 57343) {
   len += 4;
   ++i;
  } else {
   len += 3;
  }
 }
 return len;
}

var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

if (ENVIRONMENT_IS_PTHREAD) {
 buffer = Module["buffer"];
}

function updateGlobalBufferAndViews(buf) {
 buffer = buf;
 Module["HEAP8"] = HEAP8 = new Int8Array(buf);
 Module["HEAP16"] = HEAP16 = new Int16Array(buf);
 Module["HEAP32"] = HEAP32 = new Int32Array(buf);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
}

var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 1073741824;

if (ENVIRONMENT_IS_PTHREAD) {
 wasmMemory = Module["wasmMemory"];
 buffer = Module["buffer"];
} else {
 if (Module["wasmMemory"]) {
  wasmMemory = Module["wasmMemory"];
 } else {
  wasmMemory = new WebAssembly.Memory({
   "initial": INITIAL_MEMORY / 65536,
   "maximum": 2147483648 / 65536,
   "shared": true
  });
  if (!(wasmMemory.buffer instanceof SharedArrayBuffer)) {
   err("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag");
   if (ENVIRONMENT_IS_NODE) {
    console.log("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)");
   }
   throw Error("bad memory");
  }
 }
}

if (wasmMemory) {
 buffer = wasmMemory.buffer;
}

INITIAL_MEMORY = buffer.byteLength;

updateGlobalBufferAndViews(buffer);

var wasmTable;

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATEXIT__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

function keepRuntimeAlive() {
 return noExitRuntime;
}

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 runtimeInitialized = true;
 if (ENVIRONMENT_IS_PTHREAD) return;
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
 FS.ignorePermissions = false;
 TTY.init();
 callRuntimeCallbacks(__ATINIT__);
}

function postRun() {
 if (ENVIRONMENT_IS_PTHREAD) return;
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
 __ATINIT__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

function getUniqueRunDependency(id) {
 return id;
}

function addRunDependency(id) {
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
}

function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

function abort(what) {
 if (ENVIRONMENT_IS_PTHREAD) {
  postMessage({
   "cmd": "onAbort",
   "arg": what
  });
 } else {
  if (Module["onAbort"]) {
   Module["onAbort"](what);
  }
 }
 what = "Aborted(" + what + ")";
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 what += ". Build with -sASSERTIONS for more info.";
 var e = new WebAssembly.RuntimeError(what);
 throw e;
}

var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
 return filename.startsWith(dataURIPrefix);
}

function isFileURI(filename) {
 return filename.startsWith("file://");
}

var wasmBinaryFile;

wasmBinaryFile = "longan.wasm";

if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary(file) {
 try {
  if (file == wasmBinaryFile && wasmBinary) {
   return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
   return readBinary(file);
  }
  throw "both async and sync fetching of the wasm failed";
 } catch (err) {
  abort(err);
 }
}

function getBinaryPromise() {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
  if (typeof fetch == "function" && !isFileURI(wasmBinaryFile)) {
   return fetch(wasmBinaryFile, {
    credentials: "same-origin"
   }).then(function(response) {
    if (!response["ok"]) {
     throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
    }
    return response["arrayBuffer"]();
   }).catch(function() {
    return getBinary(wasmBinaryFile);
   });
  } else {
   if (readAsync) {
    return new Promise(function(resolve, reject) {
     readAsync(wasmBinaryFile, function(response) {
      resolve(new Uint8Array(response));
     }, reject);
    });
   }
  }
 }
 return Promise.resolve().then(function() {
  return getBinary(wasmBinaryFile);
 });
}

function createWasm() {
 var info = {
  "a": asmLibraryArg
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  Module["asm"] = exports;
  registerTLSInit(Module["asm"]["Aj"]);
  wasmTable = Module["asm"]["eb"];
  addOnInit(Module["asm"]["db"]);
  wasmModule = module;
  if (!ENVIRONMENT_IS_PTHREAD) {
   var numWorkersToLoad = PThread.unusedWorkers.length;
   PThread.unusedWorkers.forEach(function(w) {
    PThread.loadWasmModuleToWorker(w, function() {
     if (!--numWorkersToLoad) removeRunDependency("wasm-instantiate");
    });
   });
  }
 }
 if (!ENVIRONMENT_IS_PTHREAD) {
  addRunDependency("wasm-instantiate");
 }
 function receiveInstantiationResult(result) {
  receiveInstance(result["instance"], result["module"]);
 }
 function instantiateArrayBuffer(receiver) {
  return getBinaryPromise().then(function(binary) {
   return WebAssembly.instantiate(binary, info);
  }).then(function(instance) {
   return instance;
  }).then(receiver, function(reason) {
   err("failed to asynchronously prepare wasm: " + reason);
   abort(reason);
  });
 }
 function instantiateAsync() {
  if (!wasmBinary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
   return fetch(wasmBinaryFile, {
    credentials: "same-origin"
   }).then(function(response) {
    var result = WebAssembly.instantiateStreaming(response, info);
    return result.then(receiveInstantiationResult, function(reason) {
     err("wasm streaming compile failed: " + reason);
     err("falling back to ArrayBuffer instantiation");
     return instantiateArrayBuffer(receiveInstantiationResult);
    });
   });
  } else {
   return instantiateArrayBuffer(receiveInstantiationResult);
  }
 }
 if (Module["instantiateWasm"]) {
  try {
   var exports = Module["instantiateWasm"](info, receiveInstance);
   return exports;
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   return false;
  }
 }
 instantiateAsync();
 return {};
}

var tempDouble;

var tempI64;

var ASM_CONSTS = {
 174636: $0 => {
  Module["firstGLContextExt"] = GL.contexts[$0].GLctx.getExtension("WEBGL_lose_context");
 },
 174728: () => {
  Module["firstGLContextExt"].loseContext();
 }
};

function Shader_Object_Init(no, program) {
 Module.shaderObjects[no].initGL(program);
}

function Shader_Object_Render(no, time) {
 Module.shaderObjects[no].update(time);
}

function Shader_Object_CreateVao(no, key, pos_count, idx_count, positions, indexes, normals, texcoords, colors) {
 let pos = new Float32Array(pos_count * 3);
 pos.set(Module.HEAPF32.subarray(positions / 4, positions / 4 + pos_count * 3));
 let idx = new Int32Array(idx_count);
 idx.set(Module.HEAP32.subarray(indexes / 4, indexes / 4 + idx_count));
 let nor = new Float32Array(pos_count * 3);
 nor.set(Module.HEAPF32.subarray(normals / 4, normals / 4 + pos_count * 3));
 let tex = null;
 if (texcoords != 0) {
  tex = new Float32Array(pos_count * 2);
  tex.set(Module.HEAPF32.subarray(texcoords / 4, texcoords / 4 + pos_count * 2));
 }
 let col = null;
 if (colors != 0) {
  col = new Float32Array(pos_count * 4);
  col.set(Module.HEAPF32.subarray(colors / 4, colors / 4 + pos_count * 4));
 }
 Module.shaderObjects[no].createVao(key, pos, idx, nor, tex, col);
}

function Image_External_Load(view_key, image_key, buffer) {
 if (Module.onImageExternalLoading) {
  Module.onImageExternalLoading(view_key, image_key, buffer);
 }
}

function After_Stream_To_Segment(key, no) {
 if (Module.onStreamToSegmentFinished) {
  Module.onStreamToSegmentFinished(key, no);
 }
}

function After_Stream_To_Geometry_Data(count) {
 if (Module.onStreamToGeometryDataFinished) {
  Module.onStreamToGeometryDataFinished(count);
 }
}

function After_Asyn_Update_View(view_key, cancelled) {
 if (Module.afterAsynUpdateView) {
  Module.afterAsynUpdateView(view_key, cancelled);
 }
}

function After_Asyn_Update_Geometry_Data(view_key, partial_key, cancelled) {
 if (Module.afterAsynUpdateGeometryData) {
  Module.afterAsynUpdateGeometryData(view_key, partial_key, cancelled);
 }
}

function After_Buffer_Geometry(no) {
 if (Module.onBufferGeometryFinished) {
  Module.onBufferGeometryFinished(no);
 }
}

function On_Collision_Computing(view_key, total, current) {
 if (Module.onCollisionComputing) {
  Module.onCollisionComputing(view_key, total, current);
 }
}

function On_Collision_Computed(view_key, count) {
 if (Module.onCollisionComputed) {
  Module.onCollisionComputed(view_key, count);
 }
}

function After_Compute_Collision(no, count, col_keys, col_paths, col_poss, col_types, cancelled) {
 if (Module.onComputeCollisionFinished) {
  let arr_list = [];
  for (let i = 0; i < count; i++) {
   let item = {
    keyOne: Module.HEAP32[col_keys / 4 + i * 2],
    keyTwo: Module.HEAP32[col_keys / 4 + i * 2 + 1],
    pathOne: UTF8ToString(Module.HEAP32[col_paths / 4 + i * 2]),
    pathTwo: UTF8ToString(Module.HEAP32[col_paths / 4 + i * 2 + 1]),
    position: [ Module.HEAPF32[col_poss / 4 + i * 3], Module.HEAPF32[col_poss / 4 + i * 3 + 1], Module.HEAPF32[col_poss / 4 + i * 3 + 2] ],
    type: Module.HEAP32[col_types / 4 + i]
   };
   arr_list.push(item);
  }
  Module.onComputeCollisionFinished(no, arr_list, cancelled);
 }
}

function After_Task_Processing(task_id, type) {
 if (Module.onTaskProcessingFinished) {
  Module.onTaskProcessingFinished(task_id, type);
 }
}

function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = "Program terminated with exit(" + status + ")";
 this.status = status;
}

function killThread(pthread_ptr) {
 var worker = PThread.pthreads[pthread_ptr];
 delete PThread.pthreads[pthread_ptr];
 worker.terminate();
 __emscripten_thread_free_data(pthread_ptr);
 PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker), 1);
 worker.pthread_ptr = 0;
}

function cancelThread(pthread_ptr) {
 var worker = PThread.pthreads[pthread_ptr];
 worker.postMessage({
  "cmd": "cancel"
 });
}

function cleanupThread(pthread_ptr) {
 var worker = PThread.pthreads[pthread_ptr];
 assert(worker);
 PThread.returnWorkerToPool(worker);
}

function spawnThread(threadParams) {
 var worker = PThread.getNewWorker();
 if (!worker) {
  return 6;
 }
 PThread.runningWorkers.push(worker);
 PThread.pthreads[threadParams.pthread_ptr] = worker;
 worker.pthread_ptr = threadParams.pthread_ptr;
 var msg = {
  "cmd": "run",
  "start_routine": threadParams.startRoutine,
  "arg": threadParams.arg,
  "pthread_ptr": threadParams.pthread_ptr
 };
 worker.runPthread = () => {
  msg.time = performance.now();
  worker.postMessage(msg, threadParams.transferList);
 };
 if (worker.loaded) {
  worker.runPthread();
  delete worker.runPthread;
 }
 return 0;
}

var PATH = {
 isAbs: path => path.charAt(0) === "/",
 splitPath: filename => {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: (parts, allowAboveRoot) => {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: path => {
  var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: path => {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: path => {
  if (path === "/") return "/";
  path = PATH.normalize(path);
  path = path.replace(/\/$/, "");
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 join: function() {
  var paths = Array.prototype.slice.call(arguments);
  return PATH.normalize(paths.join("/"));
 },
 join2: (l, r) => {
  return PATH.normalize(l + "/" + r);
 }
};

function getRandomDevice() {
 if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
  var randomBuffer = new Uint8Array(1);
  return () => {
   crypto.getRandomValues(randomBuffer);
   return randomBuffer[0];
  };
 } else if (ENVIRONMENT_IS_NODE) {
  try {
   var crypto_module = require("crypto");
   return () => crypto_module["randomBytes"](1)[0];
  } catch (e) {}
 }
 return () => abort("randomDevice");
}

var PATH_FS = {
 resolve: function() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = i >= 0 ? arguments[i] : FS.cwd();
   if (typeof path != "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = PATH.isAbs(path);
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
 },
 relative: (from, to) => {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (;start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (;end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 }
};

function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}

var TTY = {
 ttys: [],
 init: function() {},
 shutdown: function() {},
 register: function(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 },
 stream_ops: {
  open: function(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(43);
   }
   stream.tty = tty;
   stream.seekable = false;
  },
  close: function(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  fsync: function(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  read: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(60);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(29);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(6);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  },
  write: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(60);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  }
 },
 default_tty_ops: {
  get_char: function(tty) {
   if (!tty.input.length) {
    var result = null;
    if (ENVIRONMENT_IS_NODE) {
     var BUFSIZE = 256;
     var buf = Buffer.alloc(BUFSIZE);
     var bytesRead = 0;
     try {
      bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, -1);
     } catch (e) {
      if (e.toString().includes("EOF")) bytesRead = 0; else throw e;
     }
     if (bytesRead > 0) {
      result = buf.slice(0, bytesRead).toString("utf-8");
     } else {
      result = null;
     }
    } else if (typeof window != "undefined" && typeof window.prompt == "function") {
     result = window.prompt("Input: ");
     if (result !== null) {
      result += "\n";
     }
    } else if (typeof readline == "function") {
     result = readline();
     if (result !== null) {
      result += "\n";
     }
    }
    if (!result) {
     return null;
    }
    tty.input = intArrayFromString(result, true);
   }
   return tty.input.shift();
  },
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync: function(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 },
 default_tty1_ops: {
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync: function(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 }
};

function mmapAlloc(size) {
 abort();
}

var MEMFS = {
 ops_table: null,
 mount: function(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, 0);
 },
 createNode: function(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(63);
  }
  if (!MEMFS.ops_table) {
   MEMFS.ops_table = {
    dir: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      lookup: MEMFS.node_ops.lookup,
      mknod: MEMFS.node_ops.mknod,
      rename: MEMFS.node_ops.rename,
      unlink: MEMFS.node_ops.unlink,
      rmdir: MEMFS.node_ops.rmdir,
      readdir: MEMFS.node_ops.readdir,
      symlink: MEMFS.node_ops.symlink
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek
     }
    },
    file: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek,
      read: MEMFS.stream_ops.read,
      write: MEMFS.stream_ops.write,
      allocate: MEMFS.stream_ops.allocate,
      mmap: MEMFS.stream_ops.mmap,
      msync: MEMFS.stream_ops.msync
     }
    },
    link: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      readlink: MEMFS.node_ops.readlink
     },
     stream: {}
    },
    chrdev: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: FS.chrdev_stream_ops
    }
   };
  }
  var node = FS.createNode(parent, name, mode, dev);
  if (FS.isDir(node.mode)) {
   node.node_ops = MEMFS.ops_table.dir.node;
   node.stream_ops = MEMFS.ops_table.dir.stream;
   node.contents = {};
  } else if (FS.isFile(node.mode)) {
   node.node_ops = MEMFS.ops_table.file.node;
   node.stream_ops = MEMFS.ops_table.file.stream;
   node.usedBytes = 0;
   node.contents = null;
  } else if (FS.isLink(node.mode)) {
   node.node_ops = MEMFS.ops_table.link.node;
   node.stream_ops = MEMFS.ops_table.link.stream;
  } else if (FS.isChrdev(node.mode)) {
   node.node_ops = MEMFS.ops_table.chrdev.node;
   node.stream_ops = MEMFS.ops_table.chrdev.stream;
  }
  node.timestamp = Date.now();
  if (parent) {
   parent.contents[name] = node;
   parent.timestamp = node.timestamp;
  }
  return node;
 },
 getFileDataAsTypedArray: function(node) {
  if (!node.contents) return new Uint8Array(0);
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 },
 expandFileStorage: function(node, newCapacity) {
  var prevCapacity = node.contents ? node.contents.length : 0;
  if (prevCapacity >= newCapacity) return;
  var CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
  if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
  var oldContents = node.contents;
  node.contents = new Uint8Array(newCapacity);
  if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
 },
 resizeFileStorage: function(node, newSize) {
  if (node.usedBytes == newSize) return;
  if (newSize == 0) {
   node.contents = null;
   node.usedBytes = 0;
  } else {
   var oldContents = node.contents;
   node.contents = new Uint8Array(newSize);
   if (oldContents) {
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
   }
   node.usedBytes = newSize;
  }
 },
 node_ops: {
  getattr: function(node) {
   var attr = {};
   attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
   attr.ino = node.id;
   attr.mode = node.mode;
   attr.nlink = 1;
   attr.uid = 0;
   attr.gid = 0;
   attr.rdev = node.rdev;
   if (FS.isDir(node.mode)) {
    attr.size = 4096;
   } else if (FS.isFile(node.mode)) {
    attr.size = node.usedBytes;
   } else if (FS.isLink(node.mode)) {
    attr.size = node.link.length;
   } else {
    attr.size = 0;
   }
   attr.atime = new Date(node.timestamp);
   attr.mtime = new Date(node.timestamp);
   attr.ctime = new Date(node.timestamp);
   attr.blksize = 4096;
   attr.blocks = Math.ceil(attr.size / attr.blksize);
   return attr;
  },
  setattr: function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  },
  lookup: function(parent, name) {
   throw FS.genericErrors[44];
  },
  mknod: function(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  },
  rename: function(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(55);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.parent.timestamp = Date.now();
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   new_dir.timestamp = old_node.parent.timestamp;
   old_node.parent = new_dir;
  },
  unlink: function(parent, name) {
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  rmdir: function(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(55);
   }
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  readdir: function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  },
  symlink: function(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
   node.link = oldpath;
   return node;
  },
  readlink: function(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(28);
   }
   return node.link;
  }
 },
 stream_ops: {
  read: function(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  },
  write: function(stream, buffer, offset, length, position, canOwn) {
   if (buffer.buffer === GROWABLE_HEAP_I8().buffer) {
    canOwn = false;
   }
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     node.contents = buffer.subarray(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (node.usedBytes === 0 && position === 0) {
     node.contents = buffer.slice(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (position + length <= node.usedBytes) {
     node.contents.set(buffer.subarray(offset, offset + length), position);
     return length;
    }
   }
   MEMFS.expandFileStorage(node, position + length);
   if (node.contents.subarray && buffer.subarray) {
    node.contents.set(buffer.subarray(offset, offset + length), position);
   } else {
    for (var i = 0; i < length; i++) {
     node.contents[position + i] = buffer[offset + i];
    }
   }
   node.usedBytes = Math.max(node.usedBytes, position + length);
   return length;
  },
  llseek: function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  },
  allocate: function(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  },
  mmap: function(stream, length, position, prot, flags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   var ptr;
   var allocated;
   var contents = stream.node.contents;
   if (!(flags & 2) && contents.buffer === buffer) {
    allocated = false;
    ptr = contents.byteOffset;
   } else {
    if (position > 0 || position + length < contents.length) {
     if (contents.subarray) {
      contents = contents.subarray(position, position + length);
     } else {
      contents = Array.prototype.slice.call(contents, position, position + length);
     }
    }
    allocated = true;
    ptr = mmapAlloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(48);
    }
    GROWABLE_HEAP_I8().set(contents, ptr);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  },
  msync: function(stream, buffer, offset, length, mmapFlags) {
   MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  }
 }
};

function asyncLoad(url, onload, onerror, noRunDep) {
 var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
 readAsync(url, arrayBuffer => {
  assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
  onload(new Uint8Array(arrayBuffer));
  if (dep) removeRunDependency(dep);
 }, event => {
  if (onerror) {
   onerror();
  } else {
   throw 'Loading data file "' + url + '" failed.';
  }
 });
 if (dep) addRunDependency(dep);
}

var FS = {
 root: null,
 mounts: [],
 devices: {},
 streams: [],
 nextInode: 1,
 nameTable: null,
 currentPath: "/",
 initialized: false,
 ignorePermissions: true,
 ErrnoError: null,
 genericErrors: {},
 filesystems: null,
 syncFSRequests: 0,
 lookupPath: (path, opts = {}) => {
  path = PATH_FS.resolve(FS.cwd(), path);
  if (!path) return {
   path: "",
   node: null
  };
  var defaults = {
   follow_mount: true,
   recurse_count: 0
  };
  opts = Object.assign(defaults, opts);
  if (opts.recurse_count > 8) {
   throw new FS.ErrnoError(32);
  }
  var parts = PATH.normalizeArray(path.split("/").filter(p => !!p), false);
  var current = FS.root;
  var current_path = "/";
  for (var i = 0; i < parts.length; i++) {
   var islast = i === parts.length - 1;
   if (islast && opts.parent) {
    break;
   }
   current = FS.lookupNode(current, parts[i]);
   current_path = PATH.join2(current_path, parts[i]);
   if (FS.isMountpoint(current)) {
    if (!islast || islast && opts.follow_mount) {
     current = current.mounted.root;
    }
   }
   if (!islast || opts.follow) {
    var count = 0;
    while (FS.isLink(current.mode)) {
     var link = FS.readlink(current_path);
     current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count + 1
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(32);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 },
 getPath: node => {
  var path;
  while (true) {
   if (FS.isRoot(node)) {
    var mount = node.mount.mountpoint;
    if (!path) return mount;
    return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
   }
   path = path ? node.name + "/" + path : node.name;
   node = node.parent;
  }
 },
 hashName: (parentid, name) => {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
  }
  return (parentid + hash >>> 0) % FS.nameTable.length;
 },
 hashAddNode: node => {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 },
 hashRemoveNode: node => {
  var hash = FS.hashName(node.parent.id, node.name);
  if (FS.nameTable[hash] === node) {
   FS.nameTable[hash] = node.name_next;
  } else {
   var current = FS.nameTable[hash];
   while (current) {
    if (current.name_next === node) {
     current.name_next = node.name_next;
     break;
    }
    current = current.name_next;
   }
  }
 },
 lookupNode: (parent, name) => {
  var errCode = FS.mayLookup(parent);
  if (errCode) {
   throw new FS.ErrnoError(errCode, parent);
  }
  var hash = FS.hashName(parent.id, name);
  for (var node = FS.nameTable[hash]; node; node = node.name_next) {
   var nodeName = node.name;
   if (node.parent.id === parent.id && nodeName === name) {
    return node;
   }
  }
  return FS.lookup(parent, name);
 },
 createNode: (parent, name, mode, rdev) => {
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 },
 destroyNode: node => {
  FS.hashRemoveNode(node);
 },
 isRoot: node => {
  return node === node.parent;
 },
 isMountpoint: node => {
  return !!node.mounted;
 },
 isFile: mode => {
  return (mode & 61440) === 32768;
 },
 isDir: mode => {
  return (mode & 61440) === 16384;
 },
 isLink: mode => {
  return (mode & 61440) === 40960;
 },
 isChrdev: mode => {
  return (mode & 61440) === 8192;
 },
 isBlkdev: mode => {
  return (mode & 61440) === 24576;
 },
 isFIFO: mode => {
  return (mode & 61440) === 4096;
 },
 isSocket: mode => {
  return (mode & 49152) === 49152;
 },
 flagModes: {
  "r": 0,
  "r+": 2,
  "w": 577,
  "w+": 578,
  "a": 1089,
  "a+": 1090
 },
 modeStringToFlags: str => {
  var flags = FS.flagModes[str];
  if (typeof flags == "undefined") {
   throw new Error("Unknown file open mode: " + str);
  }
  return flags;
 },
 flagsToPermissionString: flag => {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if (flag & 512) {
   perms += "w";
  }
  return perms;
 },
 nodePermissions: (node, perms) => {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.includes("r") && !(node.mode & 292)) {
   return 2;
  } else if (perms.includes("w") && !(node.mode & 146)) {
   return 2;
  } else if (perms.includes("x") && !(node.mode & 73)) {
   return 2;
  }
  return 0;
 },
 mayLookup: dir => {
  var errCode = FS.nodePermissions(dir, "x");
  if (errCode) return errCode;
  if (!dir.node_ops.lookup) return 2;
  return 0;
 },
 mayCreate: (dir, name) => {
  try {
   var node = FS.lookupNode(dir, name);
   return 20;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 },
 mayDelete: (dir, name, isdir) => {
  var node;
  try {
   node = FS.lookupNode(dir, name);
  } catch (e) {
   return e.errno;
  }
  var errCode = FS.nodePermissions(dir, "wx");
  if (errCode) {
   return errCode;
  }
  if (isdir) {
   if (!FS.isDir(node.mode)) {
    return 54;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 10;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 31;
   }
  }
  return 0;
 },
 mayOpen: (node, flags) => {
  if (!node) {
   return 44;
  }
  if (FS.isLink(node.mode)) {
   return 32;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
    return 31;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 },
 MAX_OPEN_FDS: 4096,
 nextfd: (fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => {
  for (var fd = fd_start; fd <= fd_end; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(33);
 },
 getStream: fd => FS.streams[fd],
 createStream: (stream, fd_start, fd_end) => {
  if (!FS.FSStream) {
   FS.FSStream = function() {
    this.shared = {};
   };
   FS.FSStream.prototype = {};
   Object.defineProperties(FS.FSStream.prototype, {
    object: {
     get: function() {
      return this.node;
     },
     set: function(val) {
      this.node = val;
     }
    },
    isRead: {
     get: function() {
      return (this.flags & 2097155) !== 1;
     }
    },
    isWrite: {
     get: function() {
      return (this.flags & 2097155) !== 0;
     }
    },
    isAppend: {
     get: function() {
      return this.flags & 1024;
     }
    },
    flags: {
     get: function() {
      return this.shared.flags;
     },
     set: function(val) {
      this.shared.flags = val;
     }
    },
    position: {
     get: function() {
      return this.shared.position;
     },
     set: function(val) {
      this.shared.position = val;
     }
    }
   });
  }
  stream = Object.assign(new FS.FSStream(), stream);
  var fd = FS.nextfd(fd_start, fd_end);
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 },
 closeStream: fd => {
  FS.streams[fd] = null;
 },
 chrdev_stream_ops: {
  open: stream => {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   if (stream.stream_ops.open) {
    stream.stream_ops.open(stream);
   }
  },
  llseek: () => {
   throw new FS.ErrnoError(70);
  }
 },
 major: dev => dev >> 8,
 minor: dev => dev & 255,
 makedev: (ma, mi) => ma << 8 | mi,
 registerDevice: (dev, ops) => {
  FS.devices[dev] = {
   stream_ops: ops
  };
 },
 getDevice: dev => FS.devices[dev],
 getMounts: mount => {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push.apply(check, m.mounts);
  }
  return mounts;
 },
 syncfs: (populate, callback) => {
  if (typeof populate == "function") {
   callback = populate;
   populate = false;
  }
  FS.syncFSRequests++;
  if (FS.syncFSRequests > 1) {
   err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
  }
  var mounts = FS.getMounts(FS.root.mount);
  var completed = 0;
  function doCallback(errCode) {
   FS.syncFSRequests--;
   return callback(errCode);
  }
  function done(errCode) {
   if (errCode) {
    if (!done.errored) {
     done.errored = true;
     return doCallback(errCode);
    }
    return;
   }
   if (++completed >= mounts.length) {
    doCallback(null);
   }
  }
  mounts.forEach(mount => {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  });
 },
 mount: (type, opts, mountpoint) => {
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(10);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(10);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(54);
   }
  }
  var mount = {
   type: type,
   opts: opts,
   mountpoint: mountpoint,
   mounts: []
  };
  var mountRoot = type.mount(mount);
  mountRoot.mount = mount;
  mount.root = mountRoot;
  if (root) {
   FS.root = mountRoot;
  } else if (node) {
   node.mounted = mount;
   if (node.mount) {
    node.mount.mounts.push(mount);
   }
  }
  return mountRoot;
 },
 unmount: mountpoint => {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(28);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach(hash => {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.includes(current.mount)) {
     FS.destroyNode(current);
    }
    current = next;
   }
  });
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  node.mount.mounts.splice(idx, 1);
 },
 lookup: (parent, name) => {
  return parent.node_ops.lookup(parent, name);
 },
 mknod: (path, mode, dev) => {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.mayCreate(parent, name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 },
 create: (path, mode) => {
  mode = mode !== undefined ? mode : 438;
  mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 },
 mkdir: (path, mode) => {
  mode = mode !== undefined ? mode : 511;
  mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 },
 mkdirTree: (path, mode) => {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 20) throw e;
   }
  }
 },
 mkdev: (path, mode, dev) => {
  if (typeof dev == "undefined") {
   dev = mode;
   mode = 438;
  }
  mode |= 8192;
  return FS.mknod(path, mode, dev);
 },
 symlink: (oldpath, newpath) => {
  if (!PATH_FS.resolve(oldpath)) {
   throw new FS.ErrnoError(44);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var newname = PATH.basename(newpath);
  var errCode = FS.mayCreate(parent, newname);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 },
 rename: (old_path, new_path) => {
  var old_dirname = PATH.dirname(old_path);
  var new_dirname = PATH.dirname(new_path);
  var old_name = PATH.basename(old_path);
  var new_name = PATH.basename(new_path);
  var lookup, old_dir, new_dir;
  lookup = FS.lookupPath(old_path, {
   parent: true
  });
  old_dir = lookup.node;
  lookup = FS.lookupPath(new_path, {
   parent: true
  });
  new_dir = lookup.node;
  if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(75);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH_FS.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(28);
  }
  relative = PATH_FS.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(55);
  }
  var new_node;
  try {
   new_node = FS.lookupNode(new_dir, new_name);
  } catch (e) {}
  if (old_node === new_node) {
   return;
  }
  var isdir = FS.isDir(old_node.mode);
  var errCode = FS.mayDelete(old_dir, old_name, isdir);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!old_dir.node_ops.rename) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
   throw new FS.ErrnoError(10);
  }
  if (new_dir !== old_dir) {
   errCode = FS.nodePermissions(old_dir, "w");
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  FS.hashRemoveNode(old_node);
  try {
   old_dir.node_ops.rename(old_node, new_dir, new_name);
  } catch (e) {
   throw e;
  } finally {
   FS.hashAddNode(old_node);
  }
 },
 rmdir: path => {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, true);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.rmdir) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.rmdir(parent, name);
  FS.destroyNode(node);
 },
 readdir: path => {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(54);
  }
  return node.node_ops.readdir(node);
 },
 unlink: path => {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, false);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.unlink) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.unlink(parent, name);
  FS.destroyNode(node);
 },
 readlink: path => {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(44);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(28);
  }
  return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 },
 stat: (path, dontFollow) => {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(63);
  }
  return node.node_ops.getattr(node);
 },
 lstat: path => {
  return FS.stat(path, true);
 },
 chmod: (path, mode, dontFollow) => {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   mode: mode & 4095 | node.mode & ~4095,
   timestamp: Date.now()
  });
 },
 lchmod: (path, mode) => {
  FS.chmod(path, mode, true);
 },
 fchmod: (fd, mode) => {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  FS.chmod(stream.node, mode);
 },
 chown: (path, uid, gid, dontFollow) => {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 },
 lchown: (path, uid, gid) => {
  FS.chown(path, uid, gid, true);
 },
 fchown: (fd, uid, gid) => {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  FS.chown(stream.node, uid, gid);
 },
 truncate: (path, len) => {
  if (len < 0) {
   throw new FS.ErrnoError(28);
  }
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: true
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.nodePermissions(node, "w");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 },
 ftruncate: (fd, len) => {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(28);
  }
  FS.truncate(stream.node, len);
 },
 utime: (path, atime, mtime) => {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 },
 open: (path, flags, mode) => {
  if (path === "") {
   throw new FS.ErrnoError(44);
  }
  flags = typeof flags == "string" ? FS.modeStringToFlags(flags) : flags;
  mode = typeof mode == "undefined" ? 438 : mode;
  if (flags & 64) {
   mode = mode & 4095 | 32768;
  } else {
   mode = 0;
  }
  var node;
  if (typeof path == "object") {
   node = path;
  } else {
   path = PATH.normalize(path);
   try {
    var lookup = FS.lookupPath(path, {
     follow: !(flags & 131072)
    });
    node = lookup.node;
   } catch (e) {}
  }
  var created = false;
  if (flags & 64) {
   if (node) {
    if (flags & 128) {
     throw new FS.ErrnoError(20);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if (flags & 65536 && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(54);
  }
  if (!created) {
   var errCode = FS.mayOpen(node, flags);
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  if (flags & 512 && !created) {
   FS.truncate(node, 0);
  }
  flags &= ~(128 | 512 | 131072);
  var stream = FS.createStream({
   node: node,
   path: FS.getPath(node),
   flags: flags,
   seekable: true,
   position: 0,
   stream_ops: node.stream_ops,
   ungotten: [],
   error: false
  });
  if (stream.stream_ops.open) {
   stream.stream_ops.open(stream);
  }
  if (Module["logReadFiles"] && !(flags & 1)) {
   if (!FS.readFiles) FS.readFiles = {};
   if (!(path in FS.readFiles)) {
    FS.readFiles[path] = 1;
   }
  }
  return stream;
 },
 close: stream => {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (stream.getdents) stream.getdents = null;
  try {
   if (stream.stream_ops.close) {
    stream.stream_ops.close(stream);
   }
  } catch (e) {
   throw e;
  } finally {
   FS.closeStream(stream.fd);
  }
  stream.fd = null;
 },
 isClosed: stream => {
  return stream.fd === null;
 },
 llseek: (stream, offset, whence) => {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(70);
  }
  if (whence != 0 && whence != 1 && whence != 2) {
   throw new FS.ErrnoError(28);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 },
 read: (stream, buffer, offset, length, position) => {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(28);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 },
 write: (stream, buffer, offset, length, position, canOwn) => {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(28);
  }
  if (stream.seekable && stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  return bytesWritten;
 },
 allocate: (stream, offset, length) => {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(28);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(138);
  }
  stream.stream_ops.allocate(stream, offset, length);
 },
 mmap: (stream, length, position, prot, flags) => {
  if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
   throw new FS.ErrnoError(2);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(2);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(43);
  }
  return stream.stream_ops.mmap(stream, length, position, prot, flags);
 },
 msync: (stream, buffer, offset, length, mmapFlags) => {
  if (!stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 },
 munmap: stream => 0,
 ioctl: (stream, cmd, arg) => {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(59);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 },
 readFile: (path, opts = {}) => {
  opts.flags = opts.flags || 0;
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error('Invalid encoding type "' + opts.encoding + '"');
  }
  var ret;
  var stream = FS.open(path, opts.flags);
  var stat = FS.stat(path);
  var length = stat.size;
  var buf = new Uint8Array(length);
  FS.read(stream, buf, 0, length, 0);
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(buf, 0);
  } else if (opts.encoding === "binary") {
   ret = buf;
  }
  FS.close(stream);
  return ret;
 },
 writeFile: (path, data, opts = {}) => {
  opts.flags = opts.flags || 577;
  var stream = FS.open(path, opts.flags, opts.mode);
  if (typeof data == "string") {
   var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
   var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
   FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
  } else if (ArrayBuffer.isView(data)) {
   FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
  } else {
   throw new Error("Unsupported data type");
  }
  FS.close(stream);
 },
 cwd: () => FS.currentPath,
 chdir: path => {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(44);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(54);
  }
  var errCode = FS.nodePermissions(lookup.node, "x");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  FS.currentPath = lookup.path;
 },
 createDefaultDirectories: () => {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 },
 createDefaultDevices: () => {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: () => 0,
   write: (stream, buffer, offset, length, pos) => length
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var random_device = getRandomDevice();
  FS.createDevice("/dev", "random", random_device);
  FS.createDevice("/dev", "urandom", random_device);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 },
 createSpecialDirectories: () => {
  FS.mkdir("/proc");
  var proc_self = FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount: () => {
    var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
    node.node_ops = {
     lookup: (parent, name) => {
      var fd = +name;
      var stream = FS.getStream(fd);
      if (!stream) throw new FS.ErrnoError(8);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: () => stream.path
       }
      };
      ret.parent = ret;
      return ret;
     }
    };
    return node;
   }
  }, {}, "/proc/self/fd");
 },
 createStandardStreams: () => {
  if (Module["stdin"]) {
   FS.createDevice("/dev", "stdin", Module["stdin"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdin");
  }
  if (Module["stdout"]) {
   FS.createDevice("/dev", "stdout", null, Module["stdout"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdout");
  }
  if (Module["stderr"]) {
   FS.createDevice("/dev", "stderr", null, Module["stderr"]);
  } else {
   FS.symlink("/dev/tty1", "/dev/stderr");
  }
  var stdin = FS.open("/dev/stdin", 0);
  var stdout = FS.open("/dev/stdout", 1);
  var stderr = FS.open("/dev/stderr", 1);
 },
 ensureErrnoError: () => {
  if (FS.ErrnoError) return;
  FS.ErrnoError = function ErrnoError(errno, node) {
   this.node = node;
   this.setErrno = function(errno) {
    this.errno = errno;
   };
   this.setErrno(errno);
   this.message = "FS error";
  };
  FS.ErrnoError.prototype = new Error();
  FS.ErrnoError.prototype.constructor = FS.ErrnoError;
  [ 44 ].forEach(code => {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  });
 },
 staticInit: () => {
  FS.ensureErrnoError();
  FS.nameTable = new Array(4096);
  FS.mount(MEMFS, {}, "/");
  FS.createDefaultDirectories();
  FS.createDefaultDevices();
  FS.createSpecialDirectories();
  FS.filesystems = {
   "MEMFS": MEMFS
  };
 },
 init: (input, output, error) => {
  FS.init.initialized = true;
  FS.ensureErrnoError();
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 },
 quit: () => {
  FS.init.initialized = false;
  for (var i = 0; i < FS.streams.length; i++) {
   var stream = FS.streams[i];
   if (!stream) {
    continue;
   }
   FS.close(stream);
  }
 },
 getMode: (canRead, canWrite) => {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
 },
 findObject: (path, dontResolveLastLink) => {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (!ret.exists) {
   return null;
  }
  return ret.object;
 },
 analyzePath: (path, dontResolveLastLink) => {
  try {
   var lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   path = lookup.path;
  } catch (e) {}
  var ret = {
   isRoot: false,
   exists: false,
   error: 0,
   name: null,
   path: null,
   object: null,
   parentExists: false,
   parentPath: null,
   parentObject: null
  };
  try {
   var lookup = FS.lookupPath(path, {
    parent: true
   });
   ret.parentExists = true;
   ret.parentPath = lookup.path;
   ret.parentObject = lookup.node;
   ret.name = PATH.basename(path);
   lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   ret.exists = true;
   ret.path = lookup.path;
   ret.object = lookup.node;
   ret.name = lookup.node.name;
   ret.isRoot = lookup.path === "/";
  } catch (e) {
   ret.error = e.errno;
  }
  return ret;
 },
 createPath: (parent, path, canRead, canWrite) => {
  parent = typeof parent == "string" ? parent : FS.getPath(parent);
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   try {
    FS.mkdir(current);
   } catch (e) {}
   parent = current;
  }
  return current;
 },
 createFile: (parent, name, properties, canRead, canWrite) => {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.create(path, mode);
 },
 createDataFile: (parent, name, data, canRead, canWrite, canOwn) => {
  var path = name;
  if (parent) {
   parent = typeof parent == "string" ? parent : FS.getPath(parent);
   path = name ? PATH.join2(parent, name) : parent;
  }
  var mode = FS.getMode(canRead, canWrite);
  var node = FS.create(path, mode);
  if (data) {
   if (typeof data == "string") {
    var arr = new Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
    data = arr;
   }
   FS.chmod(node, mode | 146);
   var stream = FS.open(node, 577);
   FS.write(stream, data, 0, data.length, 0, canOwn);
   FS.close(stream);
   FS.chmod(node, mode);
  }
  return node;
 },
 createDevice: (parent, name, input, output) => {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open: stream => {
    stream.seekable = false;
   },
   close: stream => {
    if (output && output.buffer && output.buffer.length) {
     output(10);
    }
   },
   read: (stream, buffer, offset, length, pos) => {
    var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(6);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   },
   write: (stream, buffer, offset, length, pos) => {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   }
  });
  return FS.mkdev(path, mode, dev);
 },
 forceLoadFile: obj => {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  if (typeof XMLHttpRequest != "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (read_) {
   try {
    obj.contents = intArrayFromString(read_(obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
 },
 createLazyFile: (parent, name, url, canRead, canWrite) => {
  function LazyUint8Array() {
   this.lengthKnown = false;
   this.chunks = [];
  }
  LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
   if (idx > this.length - 1 || idx < 0) {
    return undefined;
   }
   var chunkOffset = idx % this.chunkSize;
   var chunkNum = idx / this.chunkSize | 0;
   return this.getter(chunkNum)[chunkOffset];
  };
  LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
   this.getter = getter;
  };
  LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
   var xhr = new XMLHttpRequest();
   xhr.open("HEAD", url, false);
   xhr.send(null);
   if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
   var datalength = Number(xhr.getResponseHeader("Content-length"));
   var header;
   var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
   var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
   var chunkSize = 1024 * 1024;
   if (!hasByteServing) chunkSize = datalength;
   var doXHR = (from, to) => {
    if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
    if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
    xhr.responseType = "arraybuffer";
    if (xhr.overrideMimeType) {
     xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
    xhr.send(null);
    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
    if (xhr.response !== undefined) {
     return new Uint8Array(xhr.response || []);
    }
    return intArrayFromString(xhr.responseText || "", true);
   };
   var lazyArray = this;
   lazyArray.setDataGetter(chunkNum => {
    var start = chunkNum * chunkSize;
    var end = (chunkNum + 1) * chunkSize - 1;
    end = Math.min(end, datalength - 1);
    if (typeof lazyArray.chunks[chunkNum] == "undefined") {
     lazyArray.chunks[chunkNum] = doXHR(start, end);
    }
    if (typeof lazyArray.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
    return lazyArray.chunks[chunkNum];
   });
   if (usesGzip || !datalength) {
    chunkSize = datalength = 1;
    datalength = this.getter(0).length;
    chunkSize = datalength;
    out("LazyFiles on gzip forces download of the whole file when length is accessed");
   }
   this._length = datalength;
   this._chunkSize = chunkSize;
   this.lengthKnown = true;
  };
  if (typeof XMLHttpRequest != "undefined") {
   if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
   var lazyArray = new LazyUint8Array();
   Object.defineProperties(lazyArray, {
    length: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._length;
     }
    },
    chunkSize: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._chunkSize;
     }
    }
   });
   var properties = {
    isDevice: false,
    contents: lazyArray
   };
  } else {
   var properties = {
    isDevice: false,
    url: url
   };
  }
  var node = FS.createFile(parent, name, properties, canRead, canWrite);
  if (properties.contents) {
   node.contents = properties.contents;
  } else if (properties.url) {
   node.contents = null;
   node.url = properties.url;
  }
  Object.defineProperties(node, {
   usedBytes: {
    get: function() {
     return this.contents.length;
    }
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach(key => {
   var fn = node.stream_ops[key];
   stream_ops[key] = function forceLoadLazyFile() {
    FS.forceLoadFile(node);
    return fn.apply(null, arguments);
   };
  });
  function writeChunks(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   if (contents.slice) {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents[position + i];
    }
   } else {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents.get(position + i);
    }
   }
   return size;
  }
  stream_ops.read = (stream, buffer, offset, length, position) => {
   FS.forceLoadFile(node);
   return writeChunks(stream, buffer, offset, length, position);
  };
  stream_ops.mmap = (stream, length, position, prot, flags) => {
   FS.forceLoadFile(node);
   var ptr = mmapAlloc(length);
   if (!ptr) {
    throw new FS.ErrnoError(48);
   }
   writeChunks(stream, GROWABLE_HEAP_I8(), ptr, length, position);
   return {
    ptr: ptr,
    allocated: true
   };
  };
  node.stream_ops = stream_ops;
  return node;
 },
 createPreloadedFile: (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
  var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
  var dep = getUniqueRunDependency("cp " + fullname);
  function processData(byteArray) {
   function finish(byteArray) {
    if (preFinish) preFinish();
    if (!dontCreateFile) {
     FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
    }
    if (onload) onload();
    removeRunDependency(dep);
   }
   if (Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => {
    if (onerror) onerror();
    removeRunDependency(dep);
   })) {
    return;
   }
   finish(byteArray);
  }
  addRunDependency(dep);
  if (typeof url == "string") {
   asyncLoad(url, byteArray => processData(byteArray), onerror);
  } else {
   processData(url);
  }
 },
 indexedDB: () => {
  return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 },
 DB_NAME: () => {
  return "EM_FS_" + window.location.pathname;
 },
 DB_VERSION: 20,
 DB_STORE_NAME: "FILE_DATA",
 saveFilesToDB: (paths, onload, onerror) => {
  onload = onload || (() => {});
  onerror = onerror || (() => {});
  var indexedDB = FS.indexedDB();
  try {
   var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = () => {
   out("creating db");
   var db = openRequest.result;
   db.createObjectStore(FS.DB_STORE_NAME);
  };
  openRequest.onsuccess = () => {
   var db = openRequest.result;
   var transaction = db.transaction([ FS.DB_STORE_NAME ], "readwrite");
   var files = transaction.objectStore(FS.DB_STORE_NAME);
   var ok = 0, fail = 0, total = paths.length;
   function finish() {
    if (fail == 0) onload(); else onerror();
   }
   paths.forEach(path => {
    var putRequest = files.put(FS.analyzePath(path).object.contents, path);
    putRequest.onsuccess = () => {
     ok++;
     if (ok + fail == total) finish();
    };
    putRequest.onerror = () => {
     fail++;
     if (ok + fail == total) finish();
    };
   });
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 },
 loadFilesFromDB: (paths, onload, onerror) => {
  onload = onload || (() => {});
  onerror = onerror || (() => {});
  var indexedDB = FS.indexedDB();
  try {
   var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = onerror;
  openRequest.onsuccess = () => {
   var db = openRequest.result;
   try {
    var transaction = db.transaction([ FS.DB_STORE_NAME ], "readonly");
   } catch (e) {
    onerror(e);
    return;
   }
   var files = transaction.objectStore(FS.DB_STORE_NAME);
   var ok = 0, fail = 0, total = paths.length;
   function finish() {
    if (fail == 0) onload(); else onerror();
   }
   paths.forEach(path => {
    var getRequest = files.get(path);
    getRequest.onsuccess = () => {
     if (FS.analyzePath(path).exists) {
      FS.unlink(path);
     }
     FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
     ok++;
     if (ok + fail == total) finish();
    };
    getRequest.onerror = () => {
     fail++;
     if (ok + fail == total) finish();
    };
   });
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 }
};

var SYSCALLS = {
 DEFAULT_POLLMASK: 5,
 calculateAt: function(dirfd, path, allowEmpty) {
  if (PATH.isAbs(path)) {
   return path;
  }
  var dir;
  if (dirfd === -100) {
   dir = FS.cwd();
  } else {
   var dirstream = SYSCALLS.getStreamFromFD(dirfd);
   dir = dirstream.path;
  }
  if (path.length == 0) {
   if (!allowEmpty) {
    throw new FS.ErrnoError(44);
   }
   return dir;
  }
  return PATH.join2(dir, path);
 },
 doStat: function(func, path, buf) {
  try {
   var stat = func(path);
  } catch (e) {
   if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
    return -54;
   }
   throw e;
  }
  GROWABLE_HEAP_I32()[buf >> 2] = stat.dev;
  GROWABLE_HEAP_I32()[buf + 8 >> 2] = stat.ino;
  GROWABLE_HEAP_I32()[buf + 12 >> 2] = stat.mode;
  GROWABLE_HEAP_U32()[buf + 16 >> 2] = stat.nlink;
  GROWABLE_HEAP_I32()[buf + 20 >> 2] = stat.uid;
  GROWABLE_HEAP_I32()[buf + 24 >> 2] = stat.gid;
  GROWABLE_HEAP_I32()[buf + 28 >> 2] = stat.rdev;
  tempI64 = [ stat.size >>> 0, (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_I32()[buf + 40 >> 2] = tempI64[0], GROWABLE_HEAP_I32()[buf + 44 >> 2] = tempI64[1];
  GROWABLE_HEAP_I32()[buf + 48 >> 2] = 4096;
  GROWABLE_HEAP_I32()[buf + 52 >> 2] = stat.blocks;
  tempI64 = [ Math.floor(stat.atime.getTime() / 1e3) >>> 0, (tempDouble = Math.floor(stat.atime.getTime() / 1e3), 
  +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_I32()[buf + 56 >> 2] = tempI64[0], GROWABLE_HEAP_I32()[buf + 60 >> 2] = tempI64[1];
  GROWABLE_HEAP_U32()[buf + 64 >> 2] = 0;
  tempI64 = [ Math.floor(stat.mtime.getTime() / 1e3) >>> 0, (tempDouble = Math.floor(stat.mtime.getTime() / 1e3), 
  +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_I32()[buf + 72 >> 2] = tempI64[0], GROWABLE_HEAP_I32()[buf + 76 >> 2] = tempI64[1];
  GROWABLE_HEAP_U32()[buf + 80 >> 2] = 0;
  tempI64 = [ Math.floor(stat.ctime.getTime() / 1e3) >>> 0, (tempDouble = Math.floor(stat.ctime.getTime() / 1e3), 
  +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_I32()[buf + 88 >> 2] = tempI64[0], GROWABLE_HEAP_I32()[buf + 92 >> 2] = tempI64[1];
  GROWABLE_HEAP_U32()[buf + 96 >> 2] = 0;
  tempI64 = [ stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_I32()[buf + 104 >> 2] = tempI64[0], GROWABLE_HEAP_I32()[buf + 108 >> 2] = tempI64[1];
  return 0;
 },
 doMsync: function(addr, stream, len, flags, offset) {
  if (!FS.isFile(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (flags & 2) {
   return 0;
  }
  var buffer = GROWABLE_HEAP_U8().slice(addr, addr + len);
  FS.msync(stream, buffer, offset, len, flags);
 },
 varargs: undefined,
 get: function() {
  SYSCALLS.varargs += 4;
  var ret = GROWABLE_HEAP_I32()[SYSCALLS.varargs - 4 >> 2];
  return ret;
 },
 getStr: function(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 },
 getStreamFromFD: function(fd) {
  var stream = FS.getStream(fd);
  if (!stream) throw new FS.ErrnoError(8);
  return stream;
 }
};

function _proc_exit(code) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(1, 1, code);
 EXITSTATUS = code;
 if (!keepRuntimeAlive()) {
  PThread.terminateAllThreads();
  if (Module["onExit"]) Module["onExit"](code);
  ABORT = true;
 }
 quit_(code, new ExitStatus(code));
}

function exitJS(status, implicit) {
 EXITSTATUS = status;
 if (!implicit) {
  if (ENVIRONMENT_IS_PTHREAD) {
   exitOnMainThread(status);
   throw "unwind";
  } else {}
 }
 _proc_exit(status);
}

var _exit = exitJS;

function handleException(e) {
 if (e instanceof ExitStatus || e == "unwind") {
  return EXITSTATUS;
 }
 quit_(1, e);
}

var PThread = {
 unusedWorkers: [],
 runningWorkers: [],
 tlsInitFunctions: [],
 pthreads: {},
 init: function() {
  if (ENVIRONMENT_IS_PTHREAD) {
   PThread.initWorker();
  } else {
   PThread.initMainThread();
  }
 },
 initMainThread: function() {
  var pthreadPoolSize = 16;
  while (pthreadPoolSize--) {
   PThread.allocateUnusedWorker();
  }
 },
 initWorker: function() {
  noExitRuntime = false;
 },
 setExitStatus: function(status) {
  EXITSTATUS = status;
 },
 terminateAllThreads: function() {
  for (var worker of Object.values(PThread.pthreads)) {
   PThread.returnWorkerToPool(worker);
  }
  for (var worker of PThread.unusedWorkers) {
   worker.terminate();
  }
  PThread.unusedWorkers = [];
 },
 returnWorkerToPool: function(worker) {
  var pthread_ptr = worker.pthread_ptr;
  delete PThread.pthreads[pthread_ptr];
  PThread.unusedWorkers.push(worker);
  PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker), 1);
  worker.pthread_ptr = 0;
  __emscripten_thread_free_data(pthread_ptr);
 },
 receiveObjectTransfer: function(data) {},
 threadInitTLS: function() {
  PThread.tlsInitFunctions.forEach(f => f());
 },
 loadWasmModuleToWorker: function(worker, onFinishedLoading) {
  worker.onmessage = e => {
   var d = e["data"];
   var cmd = d["cmd"];
   if (worker.pthread_ptr) PThread.currentProxiedOperationCallerThread = worker.pthread_ptr;
   if (d["targetThread"] && d["targetThread"] != _pthread_self()) {
    var targetWorker = PThread.pthreads[d.targetThread];
    if (targetWorker) {
     targetWorker.postMessage(d, d["transferList"]);
    } else {
     err('Internal error! Worker sent a message "' + cmd + '" to target pthread ' + d["targetThread"] + ", but that thread no longer exists!");
    }
    PThread.currentProxiedOperationCallerThread = undefined;
    return;
   }
   if (cmd === "processProxyingQueue") {
    executeNotifiedProxyingQueue(d["queue"]);
   } else if (cmd === "spawnThread") {
    spawnThread(d);
   } else if (cmd === "cleanupThread") {
    cleanupThread(d["thread"]);
   } else if (cmd === "killThread") {
    killThread(d["thread"]);
   } else if (cmd === "cancelThread") {
    cancelThread(d["thread"]);
   } else if (cmd === "loaded") {
    worker.loaded = true;
    if (onFinishedLoading) onFinishedLoading(worker);
    if (worker.runPthread) {
     worker.runPthread();
     delete worker.runPthread;
    }
   } else if (cmd === "print") {
    out("Thread " + d["threadId"] + ": " + d["text"]);
   } else if (cmd === "printErr") {
    err("Thread " + d["threadId"] + ": " + d["text"]);
   } else if (cmd === "alert") {
    alert("Thread " + d["threadId"] + ": " + d["text"]);
   } else if (d.target === "setimmediate") {
    worker.postMessage(d);
   } else if (cmd === "onAbort") {
    if (Module["onAbort"]) {
     Module["onAbort"](d["arg"]);
    }
   } else if (cmd) {
    err("worker sent an unknown command " + cmd);
   }
   PThread.currentProxiedOperationCallerThread = undefined;
  };
  worker.onerror = e => {
   var message = "worker sent an error!";
   err(message + " " + e.filename + ":" + e.lineno + ": " + e.message);
   throw e;
  };
  if (ENVIRONMENT_IS_NODE) {
   worker.on("message", function(data) {
    worker.onmessage({
     data: data
    });
   });
   worker.on("error", function(e) {
    worker.onerror(e);
   });
   worker.on("detachedExit", function() {});
  }
  worker.postMessage({
   "cmd": "load",
   "urlOrBlob": Module["mainScriptUrlOrBlob"] || _scriptDir,
   "wasmMemory": wasmMemory,
   "wasmModule": wasmModule
  });
 },
 allocateUnusedWorker: function() {
  var pthreadMainJs = locateFile("longan.worker.js");
  PThread.unusedWorkers.push(new Worker(pthreadMainJs));
 },
 getNewWorker: function() {
  if (PThread.unusedWorkers.length == 0) {
   PThread.allocateUnusedWorker();
   PThread.loadWasmModuleToWorker(PThread.unusedWorkers[0]);
  }
  return PThread.unusedWorkers.pop();
 }
};

Module["PThread"] = PThread;

function callRuntimeCallbacks(callbacks) {
 while (callbacks.length > 0) {
  callbacks.shift()(Module);
 }
}

function withStackSave(f) {
 var stack = stackSave();
 var ret = f();
 stackRestore(stack);
 return ret;
}

function establishStackSpace() {
 var pthread_ptr = _pthread_self();
 var stackTop = GROWABLE_HEAP_I32()[pthread_ptr + 44 >> 2];
 var stackSize = GROWABLE_HEAP_I32()[pthread_ptr + 48 >> 2];
 var stackMax = stackTop - stackSize;
 _emscripten_stack_set_limits(stackTop, stackMax);
 stackRestore(stackTop);
}

Module["establishStackSpace"] = establishStackSpace;

function exitOnMainThread(returnCode) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(2, 0, returnCode);
 try {
  _exit(returnCode);
 } catch (e) {
  handleException(e);
 }
}

var wasmTableMirror = [];

function getWasmTableEntry(funcPtr) {
 var func = wasmTableMirror[funcPtr];
 if (!func) {
  if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
  wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
 }
 return func;
}

function invokeEntryPoint(ptr, arg) {
 var result = getWasmTableEntry(ptr)(arg);
 if (keepRuntimeAlive()) {
  PThread.setExitStatus(result);
 } else {
  __emscripten_thread_exit(result);
 }
}

Module["invokeEntryPoint"] = invokeEntryPoint;

function registerTLSInit(tlsInitFunc) {
 PThread.tlsInitFunctions.push(tlsInitFunc);
}

function ___emscripten_init_main_thread_js(tb) {
 __emscripten_thread_init(tb, !ENVIRONMENT_IS_WORKER, 1, !ENVIRONMENT_IS_WEB);
 PThread.threadInitTLS();
}

function ___emscripten_thread_cleanup(thread) {
 if (!ENVIRONMENT_IS_PTHREAD) cleanupThread(thread); else postMessage({
  "cmd": "cleanupThread",
  "thread": thread
 });
}

function pthreadCreateProxied(pthread_ptr, attr, startRoutine, arg) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(3, 1, pthread_ptr, attr, startRoutine, arg);
 return ___pthread_create_js(pthread_ptr, attr, startRoutine, arg);
}

function ___pthread_create_js(pthread_ptr, attr, startRoutine, arg) {
 if (typeof SharedArrayBuffer == "undefined") {
  err("Current environment does not support SharedArrayBuffer, pthreads are not available!");
  return 6;
 }
 var transferList = [];
 var error = 0;
 if (ENVIRONMENT_IS_PTHREAD && (transferList.length === 0 || error)) {
  return pthreadCreateProxied(pthread_ptr, attr, startRoutine, arg);
 }
 if (error) return error;
 var threadParams = {
  startRoutine: startRoutine,
  pthread_ptr: pthread_ptr,
  arg: arg,
  transferList: transferList
 };
 if (ENVIRONMENT_IS_PTHREAD) {
  threadParams.cmd = "spawnThread";
  postMessage(threadParams, transferList);
  return 0;
 }
 return spawnThread(threadParams);
}

function setErrNo(value) {
 GROWABLE_HEAP_I32()[___errno_location() >> 2] = value;
 return value;
}

function ___syscall_fcntl64(fd, cmd, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(4, 1, fd, cmd, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (cmd) {
  case 0:
   {
    var arg = SYSCALLS.get();
    if (arg < 0) {
     return -28;
    }
    var newStream;
    newStream = FS.createStream(stream, arg);
    return newStream.fd;
   }

  case 1:
  case 2:
   return 0;

  case 3:
   return stream.flags;

  case 4:
   {
    var arg = SYSCALLS.get();
    stream.flags |= arg;
    return 0;
   }

  case 5:
   {
    var arg = SYSCALLS.get();
    var offset = 0;
    GROWABLE_HEAP_I16()[arg + offset >> 1] = 2;
    return 0;
   }

  case 6:
  case 7:
   return 0;

  case 16:
  case 8:
   return -28;

  case 9:
   setErrNo(28);
   return -1;

  default:
   {
    return -28;
   }
  }
 } catch (e) {
  if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
  return -e.errno;
 }
}

function ___syscall_ioctl(fd, op, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(5, 1, fd, op, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (op) {
  case 21509:
  case 21505:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21510:
  case 21511:
  case 21512:
  case 21506:
  case 21507:
  case 21508:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21519:
   {
    if (!stream.tty) return -59;
    var argp = SYSCALLS.get();
    GROWABLE_HEAP_I32()[argp >> 2] = 0;
    return 0;
   }

  case 21520:
   {
    if (!stream.tty) return -59;
    return -28;
   }

  case 21531:
   {
    var argp = SYSCALLS.get();
    return FS.ioctl(stream, op, argp);
   }

  case 21523:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21524:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  default:
   return -28;
  }
 } catch (e) {
  if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
  return -e.errno;
 }
}

function ___syscall_openat(dirfd, path, flags, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(6, 1, dirfd, path, flags, varargs);
 SYSCALLS.varargs = varargs;
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  var mode = varargs ? SYSCALLS.get() : 0;
  return FS.open(path, flags, mode).fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
  return -e.errno;
 }
}

function __emscripten_default_pthread_stack_size() {
 return 2097152;
}

function executeNotifiedProxyingQueue(queue) {
 Atomics.store(GROWABLE_HEAP_I32(), queue >> 2, 1);
 if (_pthread_self()) {
  __emscripten_proxy_execute_task_queue(queue);
 }
 Atomics.compareExchange(GROWABLE_HEAP_I32(), queue >> 2, 1, 0);
}

Module["executeNotifiedProxyingQueue"] = executeNotifiedProxyingQueue;

function __emscripten_notify_task_queue(targetThreadId, currThreadId, mainThreadId, queue) {
 if (targetThreadId == currThreadId) {
  setTimeout(() => executeNotifiedProxyingQueue(queue));
 } else if (ENVIRONMENT_IS_PTHREAD) {
  postMessage({
   "targetThread": targetThreadId,
   "cmd": "processProxyingQueue",
   "queue": queue
  });
 } else {
  var worker = PThread.pthreads[targetThreadId];
  if (!worker) {
   return;
  }
  worker.postMessage({
   "cmd": "processProxyingQueue",
   "queue": queue
  });
 }
 return 1;
}

function __emscripten_set_offscreencanvas_size(target, width, height) {
 return -1;
}

function __emscripten_throw_longjmp() {
 throw Infinity;
}

function _abort() {
 abort("");
}

var readAsmConstArgsArray = [];

function readAsmConstArgs(sigPtr, buf) {
 readAsmConstArgsArray.length = 0;
 var ch;
 buf >>= 2;
 while (ch = GROWABLE_HEAP_U8()[sigPtr++]) {
  buf += ch != 105 & buf;
  readAsmConstArgsArray.push(ch == 105 ? GROWABLE_HEAP_I32()[buf] : GROWABLE_HEAP_F64()[buf++ >> 1]);
  ++buf;
 }
 return readAsmConstArgsArray;
}

function _emscripten_asm_const_int(code, sigPtr, argbuf) {
 var args = readAsmConstArgs(sigPtr, argbuf);
 return ASM_CONSTS[code].apply(null, args);
}

function _emscripten_console_log(str) {
 console.log(UTF8ToString(str));
}

var _emscripten_get_now;

if (ENVIRONMENT_IS_NODE) {
 _emscripten_get_now = () => {
  var t = process["hrtime"]();
  return t[0] * 1e3 + t[1] / 1e6;
 };
} else if (ENVIRONMENT_IS_PTHREAD) {
 _emscripten_get_now = () => performance.now() - Module["__performance_now_clock_drift"];
} else _emscripten_get_now = () => performance.now();

function _emscripten_memcpy_big(dest, src, num) {
 GROWABLE_HEAP_U8().copyWithin(dest, src, src + num);
}

function _emscripten_proxy_to_main_thread_js(index, sync) {
 var numCallArgs = arguments.length - 2;
 var outerArgs = arguments;
 return withStackSave(() => {
  var serializedNumCallArgs = numCallArgs;
  var args = stackAlloc(serializedNumCallArgs * 8);
  var b = args >> 3;
  for (var i = 0; i < numCallArgs; i++) {
   var arg = outerArgs[2 + i];
   GROWABLE_HEAP_F64()[b + i] = arg;
  }
  return _emscripten_run_in_main_runtime_thread_js(index, serializedNumCallArgs, args, sync);
 });
}

var _emscripten_receive_on_main_thread_js_callArgs = [];

function _emscripten_receive_on_main_thread_js(index, numCallArgs, args) {
 _emscripten_receive_on_main_thread_js_callArgs.length = numCallArgs;
 var b = args >> 3;
 for (var i = 0; i < numCallArgs; i++) {
  _emscripten_receive_on_main_thread_js_callArgs[i] = GROWABLE_HEAP_F64()[b + i];
 }
 var isEmAsmConst = index < 0;
 var func = !isEmAsmConst ? proxiedFunctionTable[index] : ASM_CONSTS[-index - 1];
 return func.apply(null, _emscripten_receive_on_main_thread_js_callArgs);
}

function getHeapMax() {
 return 2147483648;
}

function emscripten_realloc_buffer(size) {
 try {
  wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
  updateGlobalBufferAndViews(wasmMemory.buffer);
  return 1;
 } catch (e) {}
}

function _emscripten_resize_heap(requestedSize) {
 var oldSize = GROWABLE_HEAP_U8().length;
 requestedSize = requestedSize >>> 0;
 if (requestedSize <= oldSize) {
  return false;
 }
 var maxHeapSize = getHeapMax();
 if (requestedSize > maxHeapSize) {
  return false;
 }
 let alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
 for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
  var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
  overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
  var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  var replacement = emscripten_realloc_buffer(newSize);
  if (replacement) {
   return true;
  }
 }
 return false;
}

function _emscripten_unwind_to_js_event_loop() {
 throw "unwind";
}

function __webgl_enable_ANGLE_instanced_arrays(ctx) {
 var ext = ctx.getExtension("ANGLE_instanced_arrays");
 if (ext) {
  ctx["vertexAttribDivisor"] = function(index, divisor) {
   ext["vertexAttribDivisorANGLE"](index, divisor);
  };
  ctx["drawArraysInstanced"] = function(mode, first, count, primcount) {
   ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
  };
  ctx["drawElementsInstanced"] = function(mode, count, type, indices, primcount) {
   ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
  };
  return 1;
 }
}

function __webgl_enable_OES_vertex_array_object(ctx) {
 var ext = ctx.getExtension("OES_vertex_array_object");
 if (ext) {
  ctx["createVertexArray"] = function() {
   return ext["createVertexArrayOES"]();
  };
  ctx["deleteVertexArray"] = function(vao) {
   ext["deleteVertexArrayOES"](vao);
  };
  ctx["bindVertexArray"] = function(vao) {
   ext["bindVertexArrayOES"](vao);
  };
  ctx["isVertexArray"] = function(vao) {
   return ext["isVertexArrayOES"](vao);
  };
  return 1;
 }
}

function __webgl_enable_WEBGL_draw_buffers(ctx) {
 var ext = ctx.getExtension("WEBGL_draw_buffers");
 if (ext) {
  ctx["drawBuffers"] = function(n, bufs) {
   ext["drawBuffersWEBGL"](n, bufs);
  };
  return 1;
 }
}

function __webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(ctx) {
 return !!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"));
}

function __webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(ctx) {
 return !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"));
}

function __webgl_enable_WEBGL_multi_draw(ctx) {
 return !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));
}

var GL = {
 counter: 1,
 buffers: [],
 programs: [],
 framebuffers: [],
 renderbuffers: [],
 textures: [],
 shaders: [],
 vaos: [],
 contexts: {},
 offscreenCanvases: {},
 queries: [],
 samplers: [],
 transformFeedbacks: [],
 syncs: [],
 stringCache: {},
 stringiCache: {},
 unpackAlignment: 4,
 recordError: function recordError(errorCode) {
  if (!GL.lastError) {
   GL.lastError = errorCode;
  }
 },
 getNewId: function(table) {
  var ret = GL.counter++;
  for (var i = table.length; i < ret; i++) {
   table[i] = null;
  }
  return ret;
 },
 getSource: function(shader, count, string, length) {
  var source = "";
  for (var i = 0; i < count; ++i) {
   var len = length ? GROWABLE_HEAP_I32()[length + i * 4 >> 2] : -1;
   source += UTF8ToString(GROWABLE_HEAP_I32()[string + i * 4 >> 2], len < 0 ? undefined : len);
  }
  return source;
 },
 createContext: function(canvas, webGLContextAttributes) {
  if (!canvas.getContextSafariWebGL2Fixed) {
   canvas.getContextSafariWebGL2Fixed = canvas.getContext;
   function fixedGetContext(ver, attrs) {
    var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
    return ver == "webgl" == gl instanceof WebGLRenderingContext ? gl : null;
   }
   canvas.getContext = fixedGetContext;
  }
  var ctx = webGLContextAttributes.majorVersion > 1 ? canvas.getContext("webgl2", webGLContextAttributes) : canvas.getContext("webgl", webGLContextAttributes);
  if (!ctx) return 0;
  var handle = GL.registerContext(ctx, webGLContextAttributes);
  return handle;
 },
 registerContext: function(ctx, webGLContextAttributes) {
  var handle = _malloc(8);
  GROWABLE_HEAP_I32()[handle + 4 >> 2] = _pthread_self();
  var context = {
   handle: handle,
   attributes: webGLContextAttributes,
   version: webGLContextAttributes.majorVersion,
   GLctx: ctx
  };
  if (ctx.canvas) ctx.canvas.GLctxObject = context;
  GL.contexts[handle] = context;
  if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
   GL.initExtensions(context);
  }
  return handle;
 },
 makeContextCurrent: function(contextHandle) {
  GL.currentContext = GL.contexts[contextHandle];
  Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx;
  return !(contextHandle && !GLctx);
 },
 getContext: function(contextHandle) {
  return GL.contexts[contextHandle];
 },
 deleteContext: function(contextHandle) {
  if (GL.currentContext === GL.contexts[contextHandle]) GL.currentContext = null;
  if (typeof JSEvents == "object") JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
  if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
  _free(GL.contexts[contextHandle].handle);
  GL.contexts[contextHandle] = null;
 },
 initExtensions: function(context) {
  if (!context) context = GL.currentContext;
  if (context.initExtensionsDone) return;
  context.initExtensionsDone = true;
  var GLctx = context.GLctx;
  __webgl_enable_ANGLE_instanced_arrays(GLctx);
  __webgl_enable_OES_vertex_array_object(GLctx);
  __webgl_enable_WEBGL_draw_buffers(GLctx);
  __webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
  __webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  if (context.version >= 2) {
   GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2");
  }
  if (context.version < 2 || !GLctx.disjointTimerQueryExt) {
   GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
  }
  __webgl_enable_WEBGL_multi_draw(GLctx);
  var exts = GLctx.getSupportedExtensions() || [];
  exts.forEach(function(ext) {
   if (!ext.includes("lose_context") && !ext.includes("debug")) {
    GLctx.getExtension(ext);
   }
  });
 }
};

var JSEvents = {
 inEventHandler: 0,
 removeAllEventListeners: function() {
  for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
   JSEvents._removeHandler(i);
  }
  JSEvents.eventHandlers = [];
  JSEvents.deferredCalls = [];
 },
 registerRemoveEventListeners: function() {
  if (!JSEvents.removeEventListenersRegistered) {
   __ATEXIT__.push(JSEvents.removeAllEventListeners);
   JSEvents.removeEventListenersRegistered = true;
  }
 },
 deferredCalls: [],
 deferCall: function(targetFunction, precedence, argsList) {
  function arraysHaveEqualContent(arrA, arrB) {
   if (arrA.length != arrB.length) return false;
   for (var i in arrA) {
    if (arrA[i] != arrB[i]) return false;
   }
   return true;
  }
  for (var i in JSEvents.deferredCalls) {
   var call = JSEvents.deferredCalls[i];
   if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
    return;
   }
  }
  JSEvents.deferredCalls.push({
   targetFunction: targetFunction,
   precedence: precedence,
   argsList: argsList
  });
  JSEvents.deferredCalls.sort(function(x, y) {
   return x.precedence < y.precedence;
  });
 },
 removeDeferredCalls: function(targetFunction) {
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
    JSEvents.deferredCalls.splice(i, 1);
    --i;
   }
  }
 },
 canPerformEventHandlerRequests: function() {
  return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
 },
 runDeferredCalls: function() {
  if (!JSEvents.canPerformEventHandlerRequests()) {
   return;
  }
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   var call = JSEvents.deferredCalls[i];
   JSEvents.deferredCalls.splice(i, 1);
   --i;
   call.targetFunction.apply(null, call.argsList);
  }
 },
 eventHandlers: [],
 removeAllHandlersOnTarget: function(target, eventTypeString) {
  for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
   if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
    JSEvents._removeHandler(i--);
   }
  }
 },
 _removeHandler: function(i) {
  var h = JSEvents.eventHandlers[i];
  h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
  JSEvents.eventHandlers.splice(i, 1);
 },
 registerOrRemoveHandler: function(eventHandler) {
  var jsEventHandler = function jsEventHandler(event) {
   ++JSEvents.inEventHandler;
   JSEvents.currentEventHandler = eventHandler;
   JSEvents.runDeferredCalls();
   eventHandler.handlerFunc(event);
   JSEvents.runDeferredCalls();
   --JSEvents.inEventHandler;
  };
  if (eventHandler.callbackfunc) {
   eventHandler.eventListenerFunc = jsEventHandler;
   eventHandler.target.addEventListener(eventHandler.eventTypeString, jsEventHandler, eventHandler.useCapture);
   JSEvents.eventHandlers.push(eventHandler);
   JSEvents.registerRemoveEventListeners();
  } else {
   for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
    if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
     JSEvents._removeHandler(i--);
    }
   }
  }
 },
 queueEventHandlerOnThread_iiii: function(targetThread, eventHandlerFunc, eventTypeId, eventData, userData) {
  withStackSave(function() {
   var varargs = stackAlloc(12);
   GROWABLE_HEAP_I32()[varargs >> 2] = eventTypeId;
   GROWABLE_HEAP_I32()[varargs + 4 >> 2] = eventData;
   GROWABLE_HEAP_I32()[varargs + 8 >> 2] = userData;
   _emscripten_dispatch_to_thread_(targetThread, 637534208, eventHandlerFunc, eventData, varargs);
  });
 },
 getTargetThreadForEventCallback: function(targetThread) {
  switch (targetThread) {
  case 1:
   return 0;

  case 2:
   return PThread.currentProxiedOperationCallerThread;

  default:
   return targetThread;
  }
 },
 getNodeNameForTarget: function(target) {
  if (!target) return "";
  if (target == window) return "#window";
  if (target == screen) return "#screen";
  return target && target.nodeName ? target.nodeName : "";
 },
 fullscreenEnabled: function() {
  return document.fullscreenEnabled || document.webkitFullscreenEnabled;
 }
};

var __emscripten_webgl_power_preferences = [ "default", "low-power", "high-performance" ];

function maybeCStringToJsString(cString) {
 return cString > 2 ? UTF8ToString(cString) : cString;
}

var specialHTMLTargets = [ 0, typeof document != "undefined" ? document : 0, typeof window != "undefined" ? window : 0 ];

function findEventTarget(target) {
 target = maybeCStringToJsString(target);
 var domElement = specialHTMLTargets[target] || (typeof document != "undefined" ? document.querySelector(target) : undefined);
 return domElement;
}

function findCanvasEventTarget(target) {
 return findEventTarget(target);
}

function _emscripten_webgl_do_create_context(target, attributes) {
 var a = attributes >> 2;
 var powerPreference = GROWABLE_HEAP_I32()[a + (24 >> 2)];
 var contextAttributes = {
  "alpha": !!GROWABLE_HEAP_I32()[a + (0 >> 2)],
  "depth": !!GROWABLE_HEAP_I32()[a + (4 >> 2)],
  "stencil": !!GROWABLE_HEAP_I32()[a + (8 >> 2)],
  "antialias": !!GROWABLE_HEAP_I32()[a + (12 >> 2)],
  "premultipliedAlpha": !!GROWABLE_HEAP_I32()[a + (16 >> 2)],
  "preserveDrawingBuffer": !!GROWABLE_HEAP_I32()[a + (20 >> 2)],
  "powerPreference": __emscripten_webgl_power_preferences[powerPreference],
  "failIfMajorPerformanceCaveat": !!GROWABLE_HEAP_I32()[a + (28 >> 2)],
  majorVersion: GROWABLE_HEAP_I32()[a + (32 >> 2)],
  minorVersion: GROWABLE_HEAP_I32()[a + (36 >> 2)],
  enableExtensionsByDefault: GROWABLE_HEAP_I32()[a + (40 >> 2)],
  explicitSwapControl: GROWABLE_HEAP_I32()[a + (44 >> 2)],
  proxyContextToMainThread: GROWABLE_HEAP_I32()[a + (48 >> 2)],
  renderViaOffscreenBackBuffer: GROWABLE_HEAP_I32()[a + (52 >> 2)]
 };
 var canvas = findCanvasEventTarget(target);
 if (!canvas) {
  return 0;
 }
 if (contextAttributes.explicitSwapControl) {
  return 0;
 }
 var contextHandle = GL.createContext(canvas, contextAttributes);
 return contextHandle;
}

var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;

function _emscripten_webgl_destroy_context(contextHandle) {
 if (GL.currentContext == contextHandle) GL.currentContext = 0;
 GL.deleteContext(contextHandle);
}

function _emscripten_webgl_do_get_current_context() {
 return GL.currentContext ? GL.currentContext.handle : 0;
}

var _emscripten_webgl_get_current_context = _emscripten_webgl_do_get_current_context;

function _emscripten_webgl_get_drawing_buffer_size(contextHandle, width, height) {
 var GLContext = GL.getContext(contextHandle);
 if (!GLContext || !GLContext.GLctx || !width || !height) {
  return -5;
 }
 GROWABLE_HEAP_I32()[width >> 2] = GLContext.GLctx.drawingBufferWidth;
 GROWABLE_HEAP_I32()[height >> 2] = GLContext.GLctx.drawingBufferHeight;
 return 0;
}

function _emscripten_webgl_init_context_attributes(attributes) {
 var a = attributes >> 2;
 for (var i = 0; i < 56 >> 2; ++i) {
  GROWABLE_HEAP_I32()[a + i] = 0;
 }
 GROWABLE_HEAP_I32()[a + (0 >> 2)] = GROWABLE_HEAP_I32()[a + (4 >> 2)] = GROWABLE_HEAP_I32()[a + (12 >> 2)] = GROWABLE_HEAP_I32()[a + (16 >> 2)] = GROWABLE_HEAP_I32()[a + (32 >> 2)] = GROWABLE_HEAP_I32()[a + (40 >> 2)] = 1;
 if (ENVIRONMENT_IS_WORKER) GROWABLE_HEAP_I32()[attributes + 48 >> 2] = 1;
}

function _emscripten_webgl_make_context_current(contextHandle) {
 var success = GL.makeContextCurrent(contextHandle);
 return success ? 0 : -5;
}

var ENV = {};

function getExecutableName() {
 return thisProgram || "./this.program";
}

function getEnvStrings() {
 if (!getEnvStrings.strings) {
  var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
  var env = {
   "USER": "web_user",
   "LOGNAME": "web_user",
   "PATH": "/",
   "PWD": "/",
   "HOME": "/home/web_user",
   "LANG": lang,
   "_": getExecutableName()
  };
  for (var x in ENV) {
   if (ENV[x] === undefined) delete env[x]; else env[x] = ENV[x];
  }
  var strings = [];
  for (var x in env) {
   strings.push(x + "=" + env[x]);
  }
  getEnvStrings.strings = strings;
 }
 return getEnvStrings.strings;
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
 for (var i = 0; i < str.length; ++i) {
  GROWABLE_HEAP_I8()[buffer++ >> 0] = str.charCodeAt(i);
 }
 if (!dontAddNull) GROWABLE_HEAP_I8()[buffer >> 0] = 0;
}

function _environ_get(__environ, environ_buf) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(7, 1, __environ, environ_buf);
 var bufSize = 0;
 getEnvStrings().forEach(function(string, i) {
  var ptr = environ_buf + bufSize;
  GROWABLE_HEAP_U32()[__environ + i * 4 >> 2] = ptr;
  writeAsciiToMemory(string, ptr);
  bufSize += string.length + 1;
 });
 return 0;
}

function _environ_sizes_get(penviron_count, penviron_buf_size) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(8, 1, penviron_count, penviron_buf_size);
 var strings = getEnvStrings();
 GROWABLE_HEAP_U32()[penviron_count >> 2] = strings.length;
 var bufSize = 0;
 strings.forEach(function(string) {
  bufSize += string.length + 1;
 });
 GROWABLE_HEAP_U32()[penviron_buf_size >> 2] = bufSize;
 return 0;
}

function _fd_close(fd) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(9, 1, fd);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.close(stream);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
  return e.errno;
 }
}

function doReadv(stream, iov, iovcnt, offset) {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = GROWABLE_HEAP_U32()[iov >> 2];
  var len = GROWABLE_HEAP_U32()[iov + 4 >> 2];
  iov += 8;
  var curr = FS.read(stream, GROWABLE_HEAP_I8(), ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
  if (curr < len) break;
 }
 return ret;
}

function _fd_read(fd, iov, iovcnt, pnum) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(10, 1, fd, iov, iovcnt, pnum);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doReadv(stream, iov, iovcnt);
  GROWABLE_HEAP_U32()[pnum >> 2] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
  return e.errno;
 }
}

function convertI32PairToI53Checked(lo, hi) {
 return hi + 2097152 >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN;
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(11, 1, fd, offset_low, offset_high, whence, newOffset);
 try {
  var offset = convertI32PairToI53Checked(offset_low, offset_high);
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.llseek(stream, offset, whence);
  tempI64 = [ stream.position >>> 0, (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_I32()[newOffset >> 2] = tempI64[0], GROWABLE_HEAP_I32()[newOffset + 4 >> 2] = tempI64[1];
  if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
  return e.errno;
 }
}

function doWritev(stream, iov, iovcnt, offset) {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = GROWABLE_HEAP_U32()[iov >> 2];
  var len = GROWABLE_HEAP_U32()[iov + 4 >> 2];
  iov += 8;
  var curr = FS.write(stream, GROWABLE_HEAP_I8(), ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
 }
 return ret;
}

function _fd_write(fd, iov, iovcnt, pnum) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(12, 1, fd, iov, iovcnt, pnum);
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doWritev(stream, iov, iovcnt);
  GROWABLE_HEAP_U32()[pnum >> 2] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
  return e.errno;
 }
}

function _glActiveTexture(x0) {
 GLctx["activeTexture"](x0);
}

function _glAttachShader(program, shader) {
 GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
}

function _glBindBuffer(target, buffer) {
 if (target == 35051) {
  GLctx.currentPixelPackBufferBinding = buffer;
 } else if (target == 35052) {
  GLctx.currentPixelUnpackBufferBinding = buffer;
 }
 GLctx.bindBuffer(target, GL.buffers[buffer]);
}

function _glBindTexture(target, texture) {
 GLctx.bindTexture(target, GL.textures[texture]);
}

function _glBindVertexArray(vao) {
 GLctx["bindVertexArray"](GL.vaos[vao]);
}

function _glBlendFunc(x0, x1) {
 GLctx["blendFunc"](x0, x1);
}

function _glBufferData(target, size, data, usage) {
 if (GL.currentContext.version >= 2) {
  if (data && size) {
   GLctx.bufferData(target, GROWABLE_HEAP_U8(), usage, data, size);
  } else {
   GLctx.bufferData(target, size, usage);
  }
 } else {
  GLctx.bufferData(target, data ? GROWABLE_HEAP_U8().subarray(data, data + size) : size, usage);
 }
}

function _glClear(x0) {
 GLctx["clear"](x0);
}

function _glClearColor(x0, x1, x2, x3) {
 GLctx["clearColor"](x0, x1, x2, x3);
}

function _glClearStencil(x0) {
 GLctx["clearStencil"](x0);
}

function _glCompileShader(shader) {
 GLctx.compileShader(GL.shaders[shader]);
}

function _glCreateProgram() {
 var id = GL.getNewId(GL.programs);
 var program = GLctx.createProgram();
 program.name = id;
 program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
 program.uniformIdCounter = 1;
 GL.programs[id] = program;
 return id;
}

function _glCreateShader(shaderType) {
 var id = GL.getNewId(GL.shaders);
 GL.shaders[id] = GLctx.createShader(shaderType);
 return id;
}

function _glCullFace(x0) {
 GLctx["cullFace"](x0);
}

function _glDeleteBuffers(n, buffers) {
 for (var i = 0; i < n; i++) {
  var id = GROWABLE_HEAP_I32()[buffers + i * 4 >> 2];
  var buffer = GL.buffers[id];
  if (!buffer) continue;
  GLctx.deleteBuffer(buffer);
  buffer.name = 0;
  GL.buffers[id] = null;
  if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
  if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
 }
}

function _glDeleteProgram(id) {
 if (!id) return;
 var program = GL.programs[id];
 if (!program) {
  GL.recordError(1281);
  return;
 }
 GLctx.deleteProgram(program);
 program.name = 0;
 GL.programs[id] = null;
}

function _glDeleteShader(id) {
 if (!id) return;
 var shader = GL.shaders[id];
 if (!shader) {
  GL.recordError(1281);
  return;
 }
 GLctx.deleteShader(shader);
 GL.shaders[id] = null;
}

function _glDeleteTextures(n, textures) {
 for (var i = 0; i < n; i++) {
  var id = GROWABLE_HEAP_I32()[textures + i * 4 >> 2];
  var texture = GL.textures[id];
  if (!texture) continue;
  GLctx.deleteTexture(texture);
  texture.name = 0;
  GL.textures[id] = null;
 }
}

function _glDeleteVertexArrays(n, vaos) {
 for (var i = 0; i < n; i++) {
  var id = GROWABLE_HEAP_I32()[vaos + i * 4 >> 2];
  GLctx["deleteVertexArray"](GL.vaos[id]);
  GL.vaos[id] = null;
 }
}

function _glDepthMask(flag) {
 GLctx.depthMask(!!flag);
}

function _glDepthRangef(x0, x1) {
 GLctx["depthRange"](x0, x1);
}

function _glDetachShader(program, shader) {
 GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
}

function _glDisable(x0) {
 GLctx["disable"](x0);
}

function _glDrawArrays(mode, first, count) {
 GLctx.drawArrays(mode, first, count);
}

function _glDrawElements(mode, count, type, indices) {
 GLctx.drawElements(mode, count, type, indices);
}

function _glEnable(x0) {
 GLctx["enable"](x0);
}

function _glEnableVertexAttribArray(index) {
 GLctx.enableVertexAttribArray(index);
}

function __glGenObject(n, buffers, createFunction, objectTable) {
 for (var i = 0; i < n; i++) {
  var buffer = GLctx[createFunction]();
  var id = buffer && GL.getNewId(objectTable);
  if (buffer) {
   buffer.name = id;
   objectTable[id] = buffer;
  } else {
   GL.recordError(1282);
  }
  GROWABLE_HEAP_I32()[buffers + i * 4 >> 2] = id;
 }
}

function _glGenBuffers(n, buffers) {
 __glGenObject(n, buffers, "createBuffer", GL.buffers);
}

function _glGenTextures(n, textures) {
 __glGenObject(n, textures, "createTexture", GL.textures);
}

function _glGenVertexArrays(n, arrays) {
 __glGenObject(n, arrays, "createVertexArray", GL.vaos);
}

function _glGenerateMipmap(x0) {
 GLctx["generateMipmap"](x0);
}

function __glGetActiveAttribOrUniform(funcName, program, index, bufSize, length, size, type, name) {
 program = GL.programs[program];
 var info = GLctx[funcName](program, index);
 if (info) {
  var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
  if (length) GROWABLE_HEAP_I32()[length >> 2] = numBytesWrittenExclNull;
  if (size) GROWABLE_HEAP_I32()[size >> 2] = info.size;
  if (type) GROWABLE_HEAP_I32()[type >> 2] = info.type;
 }
}

function _glGetActiveAttrib(program, index, bufSize, length, size, type, name) {
 __glGetActiveAttribOrUniform("getActiveAttrib", program, index, bufSize, length, size, type, name);
}

function _glGetActiveUniform(program, index, bufSize, length, size, type, name) {
 __glGetActiveAttribOrUniform("getActiveUniform", program, index, bufSize, length, size, type, name);
}

function _glGetAttribLocation(program, name) {
 return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
}

function _glGetError() {
 var error = GLctx.getError() || GL.lastError;
 GL.lastError = 0;
 return error;
}

function _glGetProgramInfoLog(program, maxLength, length, infoLog) {
 var log = GLctx.getProgramInfoLog(GL.programs[program]);
 if (log === null) log = "(unknown error)";
 var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
 if (length) GROWABLE_HEAP_I32()[length >> 2] = numBytesWrittenExclNull;
}

function _glGetProgramiv(program, pname, p) {
 if (!p) {
  GL.recordError(1281);
  return;
 }
 if (program >= GL.counter) {
  GL.recordError(1281);
  return;
 }
 program = GL.programs[program];
 if (pname == 35716) {
  var log = GLctx.getProgramInfoLog(program);
  if (log === null) log = "(unknown error)";
  GROWABLE_HEAP_I32()[p >> 2] = log.length + 1;
 } else if (pname == 35719) {
  if (!program.maxUniformLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
    program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length + 1);
   }
  }
  GROWABLE_HEAP_I32()[p >> 2] = program.maxUniformLength;
 } else if (pname == 35722) {
  if (!program.maxAttributeLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35721); ++i) {
    program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length + 1);
   }
  }
  GROWABLE_HEAP_I32()[p >> 2] = program.maxAttributeLength;
 } else if (pname == 35381) {
  if (!program.maxUniformBlockNameLength) {
   for (var i = 0; i < GLctx.getProgramParameter(program, 35382); ++i) {
    program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length + 1);
   }
  }
  GROWABLE_HEAP_I32()[p >> 2] = program.maxUniformBlockNameLength;
 } else {
  GROWABLE_HEAP_I32()[p >> 2] = GLctx.getProgramParameter(program, pname);
 }
}

function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
 var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
 if (log === null) log = "(unknown error)";
 var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
 if (length) GROWABLE_HEAP_I32()[length >> 2] = numBytesWrittenExclNull;
}

function _glGetShaderiv(shader, pname, p) {
 if (!p) {
  GL.recordError(1281);
  return;
 }
 if (pname == 35716) {
  var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
  if (log === null) log = "(unknown error)";
  var logLength = log ? log.length + 1 : 0;
  GROWABLE_HEAP_I32()[p >> 2] = logLength;
 } else if (pname == 35720) {
  var source = GLctx.getShaderSource(GL.shaders[shader]);
  var sourceLength = source ? source.length + 1 : 0;
  GROWABLE_HEAP_I32()[p >> 2] = sourceLength;
 } else {
  GROWABLE_HEAP_I32()[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname);
 }
}

function jstoi_q(str) {
 return parseInt(str);
}

function webglGetLeftBracePos(name) {
 return name.slice(-1) == "]" && name.lastIndexOf("[");
}

function webglPrepareUniformLocationsBeforeFirstUse(program) {
 var uniformLocsById = program.uniformLocsById, uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, i, j;
 if (!uniformLocsById) {
  program.uniformLocsById = uniformLocsById = {};
  program.uniformArrayNamesById = {};
  for (i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
   var u = GLctx.getActiveUniform(program, i);
   var nm = u.name;
   var sz = u.size;
   var lb = webglGetLeftBracePos(nm);
   var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
   var id = program.uniformIdCounter;
   program.uniformIdCounter += sz;
   uniformSizeAndIdsByName[arrayName] = [ sz, id ];
   for (j = 0; j < sz; ++j) {
    uniformLocsById[id] = j;
    program.uniformArrayNamesById[id++] = arrayName;
   }
  }
 }
}

function _glGetUniformLocation(program, name) {
 name = UTF8ToString(name);
 if (program = GL.programs[program]) {
  webglPrepareUniformLocationsBeforeFirstUse(program);
  var uniformLocsById = program.uniformLocsById;
  var arrayIndex = 0;
  var uniformBaseName = name;
  var leftBrace = webglGetLeftBracePos(name);
  if (leftBrace > 0) {
   arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
   uniformBaseName = name.slice(0, leftBrace);
  }
  var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
  if (sizeAndId && arrayIndex < sizeAndId[0]) {
   arrayIndex += sizeAndId[1];
   if (uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name)) {
    return arrayIndex;
   }
  }
 } else {
  GL.recordError(1281);
 }
 return -1;
}

function _glLinkProgram(program) {
 program = GL.programs[program];
 GLctx.linkProgram(program);
 program.uniformLocsById = 0;
 program.uniformSizeAndIdsByName = {};
}

function _glPolygonOffset(x0, x1) {
 GLctx["polygonOffset"](x0, x1);
}

function _glShaderSource(shader, count, string, length) {
 var source = GL.getSource(shader, count, string, length);
 GLctx.shaderSource(GL.shaders[shader], source);
}

function _glStencilFunc(x0, x1, x2) {
 GLctx["stencilFunc"](x0, x1, x2);
}

function _glStencilOp(x0, x1, x2) {
 GLctx["stencilOp"](x0, x1, x2);
}

function computeUnpackAlignedImageSize(width, height, sizePerPixel, alignment) {
 function roundedToNextMultipleOf(x, y) {
  return x + y - 1 & -y;
 }
 var plainRowSize = width * sizePerPixel;
 var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
 return height * alignedRowSize;
}

function __colorChannelsInGlTextureFormat(format) {
 var colorChannels = {
  5: 3,
  6: 4,
  8: 2,
  29502: 3,
  29504: 4,
  26917: 2,
  26918: 2,
  29846: 3,
  29847: 4
 };
 return colorChannels[format - 6402] || 1;
}

function heapObjectForWebGLType(type) {
 type -= 5120;
 if (type == 0) return GROWABLE_HEAP_I8();
 if (type == 1) return GROWABLE_HEAP_U8();
 if (type == 2) return GROWABLE_HEAP_I16();
 if (type == 4) return GROWABLE_HEAP_I32();
 if (type == 6) return GROWABLE_HEAP_F32();
 if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782) return GROWABLE_HEAP_U32();
 return GROWABLE_HEAP_U16();
}

function heapAccessShiftForWebGLHeap(heap) {
 return 31 - Math.clz32(heap.BYTES_PER_ELEMENT);
}

function emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) {
 var heap = heapObjectForWebGLType(type);
 var shift = heapAccessShiftForWebGLHeap(heap);
 var byteSize = 1 << shift;
 var sizePerPixel = __colorChannelsInGlTextureFormat(format) * byteSize;
 var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment);
 return heap.subarray(pixels >> shift, pixels + bytes >> shift);
}

function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
 if (GL.currentContext.version >= 2) {
  if (GLctx.currentPixelUnpackBufferBinding) {
   GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
  } else if (pixels) {
   var heap = heapObjectForWebGLType(type);
   GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, pixels >> heapAccessShiftForWebGLHeap(heap));
  } else {
   GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, null);
  }
  return;
 }
 GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null);
}

function _glTexParameteri(x0, x1, x2) {
 GLctx["texParameteri"](x0, x1, x2);
}

function webglGetUniformLocation(location) {
 var p = GLctx.currentProgram;
 if (p) {
  var webglLoc = p.uniformLocsById[location];
  if (typeof webglLoc == "number") {
   p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? "[" + webglLoc + "]" : ""));
  }
  return webglLoc;
 } else {
  GL.recordError(1282);
 }
}

function _glUniform1f(location, v0) {
 GLctx.uniform1f(webglGetUniformLocation(location), v0);
}

function _glUniform1i(location, v0) {
 GLctx.uniform1i(webglGetUniformLocation(location), v0);
}

var __miniTempWebGLIntBuffers = [];

function _glUniform1iv(location, count, value) {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform1iv(webglGetUniformLocation(location), GROWABLE_HEAP_I32(), value >> 2, count);
  return;
 }
 if (count <= 288) {
  var view = __miniTempWebGLIntBuffers[count - 1];
  for (var i = 0; i < count; ++i) {
   view[i] = GROWABLE_HEAP_I32()[value + 4 * i >> 2];
  }
 } else {
  var view = GROWABLE_HEAP_I32().subarray(value >> 2, value + count * 4 >> 2);
 }
 GLctx.uniform1iv(webglGetUniformLocation(location), view);
}

var miniTempWebGLFloatBuffers = [];

function _glUniform2fv(location, count, value) {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform2fv(webglGetUniformLocation(location), GROWABLE_HEAP_F32(), value >> 2, count * 2);
  return;
 }
 if (count <= 144) {
  var view = miniTempWebGLFloatBuffers[2 * count - 1];
  for (var i = 0; i < 2 * count; i += 2) {
   view[i] = GROWABLE_HEAP_F32()[value + 4 * i >> 2];
   view[i + 1] = GROWABLE_HEAP_F32()[value + (4 * i + 4) >> 2];
  }
 } else {
  var view = GROWABLE_HEAP_F32().subarray(value >> 2, value + count * 8 >> 2);
 }
 GLctx.uniform2fv(webglGetUniformLocation(location), view);
}

function _glUniform3fv(location, count, value) {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform3fv(webglGetUniformLocation(location), GROWABLE_HEAP_F32(), value >> 2, count * 3);
  return;
 }
 if (count <= 96) {
  var view = miniTempWebGLFloatBuffers[3 * count - 1];
  for (var i = 0; i < 3 * count; i += 3) {
   view[i] = GROWABLE_HEAP_F32()[value + 4 * i >> 2];
   view[i + 1] = GROWABLE_HEAP_F32()[value + (4 * i + 4) >> 2];
   view[i + 2] = GROWABLE_HEAP_F32()[value + (4 * i + 8) >> 2];
  }
 } else {
  var view = GROWABLE_HEAP_F32().subarray(value >> 2, value + count * 12 >> 2);
 }
 GLctx.uniform3fv(webglGetUniformLocation(location), view);
}

function _glUniform4fv(location, count, value) {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniform4fv(webglGetUniformLocation(location), GROWABLE_HEAP_F32(), value >> 2, count * 4);
  return;
 }
 if (count <= 72) {
  var view = miniTempWebGLFloatBuffers[4 * count - 1];
  var heap = GROWABLE_HEAP_F32();
  value >>= 2;
  for (var i = 0; i < 4 * count; i += 4) {
   var dst = value + i;
   view[i] = heap[dst];
   view[i + 1] = heap[dst + 1];
   view[i + 2] = heap[dst + 2];
   view[i + 3] = heap[dst + 3];
  }
 } else {
  var view = GROWABLE_HEAP_F32().subarray(value >> 2, value + count * 16 >> 2);
 }
 GLctx.uniform4fv(webglGetUniformLocation(location), view);
}

function _glUniformMatrix4fv(location, count, transpose, value) {
 if (GL.currentContext.version >= 2) {
  count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, GROWABLE_HEAP_F32(), value >> 2, count * 16);
  return;
 }
 if (count <= 18) {
  var view = miniTempWebGLFloatBuffers[16 * count - 1];
  var heap = GROWABLE_HEAP_F32();
  value >>= 2;
  for (var i = 0; i < 16 * count; i += 16) {
   var dst = value + i;
   view[i] = heap[dst];
   view[i + 1] = heap[dst + 1];
   view[i + 2] = heap[dst + 2];
   view[i + 3] = heap[dst + 3];
   view[i + 4] = heap[dst + 4];
   view[i + 5] = heap[dst + 5];
   view[i + 6] = heap[dst + 6];
   view[i + 7] = heap[dst + 7];
   view[i + 8] = heap[dst + 8];
   view[i + 9] = heap[dst + 9];
   view[i + 10] = heap[dst + 10];
   view[i + 11] = heap[dst + 11];
   view[i + 12] = heap[dst + 12];
   view[i + 13] = heap[dst + 13];
   view[i + 14] = heap[dst + 14];
   view[i + 15] = heap[dst + 15];
  }
 } else {
  var view = GROWABLE_HEAP_F32().subarray(value >> 2, value + count * 64 >> 2);
 }
 GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
}

function _glUseProgram(program) {
 program = GL.programs[program];
 GLctx.useProgram(program);
 GLctx.currentProgram = program;
}

function _glVertexAttrib4fv(index, v) {
 GLctx.vertexAttrib4f(index, GROWABLE_HEAP_F32()[v >> 2], GROWABLE_HEAP_F32()[v + 4 >> 2], GROWABLE_HEAP_F32()[v + 8 >> 2], GROWABLE_HEAP_F32()[v + 12 >> 2]);
}

function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
 GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
}

function _glViewport(x0, x1, x2, x3) {
 GLctx["viewport"](x0, x1, x2, x3);
}

function allocateUTF8(str) {
 var size = lengthBytesUTF8(str) + 1;
 var ret = _malloc(size);
 if (ret) stringToUTF8Array(str, GROWABLE_HEAP_I8(), ret, size);
 return ret;
}

PThread.init();

var FSNode = function(parent, name, mode, rdev) {
 if (!parent) {
  parent = this;
 }
 this.parent = parent;
 this.mount = parent.mount;
 this.mounted = null;
 this.id = FS.nextInode++;
 this.name = name;
 this.mode = mode;
 this.node_ops = {};
 this.stream_ops = {};
 this.rdev = rdev;
};

var readMode = 292 | 73;

var writeMode = 146;

Object.defineProperties(FSNode.prototype, {
 read: {
  get: function() {
   return (this.mode & readMode) === readMode;
  },
  set: function(val) {
   val ? this.mode |= readMode : this.mode &= ~readMode;
  }
 },
 write: {
  get: function() {
   return (this.mode & writeMode) === writeMode;
  },
  set: function(val) {
   val ? this.mode |= writeMode : this.mode &= ~writeMode;
  }
 },
 isFolder: {
  get: function() {
   return FS.isDir(this.mode);
  }
 },
 isDevice: {
  get: function() {
   return FS.isChrdev(this.mode);
  }
 }
});

FS.FSNode = FSNode;

FS.staticInit();

var GLctx;

var __miniTempWebGLIntBuffersStorage = new Int32Array(288);

for (var i = 0; i < 288; ++i) {
 __miniTempWebGLIntBuffers[i] = __miniTempWebGLIntBuffersStorage.subarray(0, i + 1);
}

var miniTempWebGLFloatBuffersStorage = new Float32Array(288);

for (var i = 0; i < 288; ++i) {
 miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i + 1);
}

var proxiedFunctionTable = [ null, _proc_exit, exitOnMainThread, pthreadCreateProxied, ___syscall_fcntl64, ___syscall_ioctl, ___syscall_openat, _environ_get, _environ_sizes_get, _fd_close, _fd_read, _fd_seek, _fd_write ];

var asmLibraryArg = {
 "ba": After_Asyn_Update_Geometry_Data,
 "cb": After_Asyn_Update_View,
 "bb": After_Buffer_Geometry,
 "aa": After_Compute_Collision,
 "ab": After_Stream_To_Geometry_Data,
 "$": After_Stream_To_Segment,
 "$a": After_Task_Processing,
 "_a": Image_External_Load,
 "Za": On_Collision_Computed,
 "Ya": On_Collision_Computing,
 "Xa": Shader_Object_CreateVao,
 "Wa": Shader_Object_Init,
 "Va": Shader_Object_Render,
 "Ua": ___emscripten_init_main_thread_js,
 "Ta": ___emscripten_thread_cleanup,
 "Sa": ___pthread_create_js,
 "_": ___syscall_fcntl64,
 "Ra": ___syscall_ioctl,
 "Qa": ___syscall_openat,
 "Ma": __emscripten_default_pthread_stack_size,
 "La": __emscripten_notify_task_queue,
 "Ka": __emscripten_set_offscreencanvas_size,
 "Ja": __emscripten_throw_longjmp,
 "X": _abort,
 "W": _emscripten_asm_const_int,
 "Ia": _emscripten_console_log,
 "n": _emscripten_get_now,
 "Ha": _emscripten_memcpy_big,
 "Ga": _emscripten_receive_on_main_thread_js,
 "Fa": _emscripten_resize_heap,
 "V": _emscripten_unwind_to_js_event_loop,
 "Ea": _emscripten_webgl_create_context,
 "Da": _emscripten_webgl_destroy_context,
 "Ca": _emscripten_webgl_get_current_context,
 "Ba": _emscripten_webgl_get_drawing_buffer_size,
 "Aa": _emscripten_webgl_init_context_attributes,
 "r": _emscripten_webgl_make_context_current,
 "Pa": _environ_get,
 "Oa": _environ_sizes_get,
 "U": _exit,
 "Z": _fd_close,
 "Na": _fd_read,
 "ca": _fd_seek,
 "Y": _fd_write,
 "l": _glActiveTexture,
 "T": _glAttachShader,
 "S": _glBindBuffer,
 "p": _glBindTexture,
 "e": _glBindVertexArray,
 "I": _glBlendFunc,
 "R": _glBufferData,
 "D": _glClear,
 "za": _glClearColor,
 "ya": _glClearStencil,
 "xa": _glCompileShader,
 "wa": _glCreateProgram,
 "va": _glCreateShader,
 "C": _glCullFace,
 "f": _glDeleteBuffers,
 "H": _glDeleteProgram,
 "Q": _glDeleteShader,
 "P": _glDeleteTextures,
 "q": _glDeleteVertexArrays,
 "B": _glDepthMask,
 "A": _glDepthRangef,
 "O": _glDetachShader,
 "k": _glDisable,
 "z": _glDrawArrays,
 "v": _glDrawElements,
 "i": _glEnable,
 "ua": _glEnableVertexAttribArray,
 "N": _glGenBuffers,
 "ta": _glGenTextures,
 "o": _glGenVertexArrays,
 "M": _glGenerateMipmap,
 "sa": _glGetActiveAttrib,
 "ra": _glGetActiveUniform,
 "qa": _glGetAttribLocation,
 "pa": _glGetError,
 "oa": _glGetProgramInfoLog,
 "u": _glGetProgramiv,
 "na": _glGetShaderInfoLog,
 "L": _glGetShaderiv,
 "ma": _glGetUniformLocation,
 "la": _glLinkProgram,
 "y": _glPolygonOffset,
 "ka": _glShaderSource,
 "t": _glStencilFunc,
 "s": _glStencilOp,
 "x": _glTexImage2D,
 "j": _glTexParameteri,
 "c": _glUniform1f,
 "b": _glUniform1i,
 "ja": _glUniform1iv,
 "K": _glUniform2fv,
 "d": _glUniform3fv,
 "G": _glUniform4fv,
 "g": _glUniformMatrix4fv,
 "m": _glUseProgram,
 "h": _glVertexAttrib4fv,
 "ia": _glVertexAttribPointer,
 "w": _glViewport,
 "ha": invoke_ii,
 "F": invoke_iii,
 "ga": invoke_iiii,
 "fa": invoke_iiiii,
 "J": invoke_v,
 "ea": invoke_vi,
 "da": invoke_vii,
 "E": invoke_viiii,
 "a": wasmMemory
};

var asm = createWasm();

var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
 return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["db"]).apply(null, arguments);
};

var _GS_Add_Font_Library = Module["_GS_Add_Font_Library"] = function() {
 return (_GS_Add_Font_Library = Module["_GS_Add_Font_Library"] = Module["asm"]["fb"]).apply(null, arguments);
};

var _GS_Set_Driver_Configs = Module["_GS_Set_Driver_Configs"] = function() {
 return (_GS_Set_Driver_Configs = Module["_GS_Set_Driver_Configs"] = Module["asm"]["gb"]).apply(null, arguments);
};

var _GS_Set_Driver_Options = Module["_GS_Set_Driver_Options"] = function() {
 return (_GS_Set_Driver_Options = Module["_GS_Set_Driver_Options"] = Module["asm"]["hb"]).apply(null, arguments);
};

var _GS_Show_Driver_Options = Module["_GS_Show_Driver_Options"] = function() {
 return (_GS_Show_Driver_Options = Module["_GS_Show_Driver_Options"] = Module["asm"]["ib"]).apply(null, arguments);
};

var _GS_Show_One_Driver_Option = Module["_GS_Show_One_Driver_Option"] = function() {
 return (_GS_Show_One_Driver_Option = Module["_GS_Show_One_Driver_Option"] = Module["asm"]["jb"]).apply(null, arguments);
};

var _GS_Set_Shader = Module["_GS_Set_Shader"] = function() {
 return (_GS_Set_Shader = Module["_GS_Set_Shader"] = Module["asm"]["kb"]).apply(null, arguments);
};

var _GS_UnSet_Shader = Module["_GS_UnSet_Shader"] = function() {
 return (_GS_UnSet_Shader = Module["_GS_UnSet_Shader"] = Module["asm"]["lb"]).apply(null, arguments);
};

var _GS_Show_Shader = Module["_GS_Show_Shader"] = function() {
 return (_GS_Show_Shader = Module["_GS_Show_Shader"] = Module["asm"]["mb"]).apply(null, arguments);
};

var _GS_Show_One_Shader = Module["_GS_Show_One_Shader"] = function() {
 return (_GS_Show_One_Shader = Module["_GS_Show_One_Shader"] = Module["asm"]["nb"]).apply(null, arguments);
};

var _GS_Set_Viewport = Module["_GS_Set_Viewport"] = function() {
 return (_GS_Set_Viewport = Module["_GS_Set_Viewport"] = Module["asm"]["ob"]).apply(null, arguments);
};

var _GS_UnSet_Viewport = Module["_GS_UnSet_Viewport"] = function() {
 return (_GS_UnSet_Viewport = Module["_GS_UnSet_Viewport"] = Module["asm"]["pb"]).apply(null, arguments);
};

var _GS_Show_Viewport = Module["_GS_Show_Viewport"] = function() {
 return (_GS_Show_Viewport = Module["_GS_Show_Viewport"] = Module["asm"]["qb"]).apply(null, arguments);
};

var _GS_Set_Camera = Module["_GS_Set_Camera"] = function() {
 return (_GS_Set_Camera = Module["_GS_Set_Camera"] = Module["asm"]["rb"]).apply(null, arguments);
};

var _GS_Set_Camera_Position = Module["_GS_Set_Camera_Position"] = function() {
 return (_GS_Set_Camera_Position = Module["_GS_Set_Camera_Position"] = Module["asm"]["sb"]).apply(null, arguments);
};

var _GS_Set_Camera_Target = Module["_GS_Set_Camera_Target"] = function() {
 return (_GS_Set_Camera_Target = Module["_GS_Set_Camera_Target"] = Module["asm"]["tb"]).apply(null, arguments);
};

var _GS_Set_Camera_Up = Module["_GS_Set_Camera_Up"] = function() {
 return (_GS_Set_Camera_Up = Module["_GS_Set_Camera_Up"] = Module["asm"]["ub"]).apply(null, arguments);
};

var _GS_Set_Camera_Field = Module["_GS_Set_Camera_Field"] = function() {
 return (_GS_Set_Camera_Field = Module["_GS_Set_Camera_Field"] = Module["asm"]["vb"]).apply(null, arguments);
};

var _GS_Set_Camera_Extent = Module["_GS_Set_Camera_Extent"] = function() {
 return (_GS_Set_Camera_Extent = Module["_GS_Set_Camera_Extent"] = Module["asm"]["wb"]).apply(null, arguments);
};

var _GS_Set_Camera_Projection = Module["_GS_Set_Camera_Projection"] = function() {
 return (_GS_Set_Camera_Projection = Module["_GS_Set_Camera_Projection"] = Module["asm"]["xb"]).apply(null, arguments);
};

var _GS_Keep_Camera_Ratio = Module["_GS_Keep_Camera_Ratio"] = function() {
 return (_GS_Keep_Camera_Ratio = Module["_GS_Keep_Camera_Ratio"] = Module["asm"]["yb"]).apply(null, arguments);
};

var _GS_Show_Camera = Module["_GS_Show_Camera"] = function() {
 return (_GS_Show_Camera = Module["_GS_Show_Camera"] = Module["asm"]["zb"]).apply(null, arguments);
};

var _GS_Show_Camera_Position = Module["_GS_Show_Camera_Position"] = function() {
 return (_GS_Show_Camera_Position = Module["_GS_Show_Camera_Position"] = Module["asm"]["Ab"]).apply(null, arguments);
};

var _GS_Show_Camera_Target = Module["_GS_Show_Camera_Target"] = function() {
 return (_GS_Show_Camera_Target = Module["_GS_Show_Camera_Target"] = Module["asm"]["Bb"]).apply(null, arguments);
};

var _GS_Show_Camera_Up = Module["_GS_Show_Camera_Up"] = function() {
 return (_GS_Show_Camera_Up = Module["_GS_Show_Camera_Up"] = Module["asm"]["Cb"]).apply(null, arguments);
};

var _GS_Show_Camera_Field = Module["_GS_Show_Camera_Field"] = function() {
 return (_GS_Show_Camera_Field = Module["_GS_Show_Camera_Field"] = Module["asm"]["Db"]).apply(null, arguments);
};

var _GS_Show_Camera_Extent = Module["_GS_Show_Camera_Extent"] = function() {
 return (_GS_Show_Camera_Extent = Module["_GS_Show_Camera_Extent"] = Module["asm"]["Eb"]).apply(null, arguments);
};

var _GS_Show_Camera_Projection = Module["_GS_Show_Camera_Projection"] = function() {
 return (_GS_Show_Camera_Projection = Module["_GS_Show_Camera_Projection"] = Module["asm"]["Fb"]).apply(null, arguments);
};

var _GS_Show_Camera_Projection_Matrix = Module["_GS_Show_Camera_Projection_Matrix"] = function() {
 return (_GS_Show_Camera_Projection_Matrix = Module["_GS_Show_Camera_Projection_Matrix"] = Module["asm"]["Gb"]).apply(null, arguments);
};

var _GS_Show_Camera_View_Matrix = Module["_GS_Show_Camera_View_Matrix"] = function() {
 return (_GS_Show_Camera_View_Matrix = Module["_GS_Show_Camera_View_Matrix"] = Module["asm"]["Hb"]).apply(null, arguments);
};

var _GS_Show_Path_Camera_Position = Module["_GS_Show_Path_Camera_Position"] = function() {
 return (_GS_Show_Path_Camera_Position = Module["_GS_Show_Path_Camera_Position"] = Module["asm"]["Ib"]).apply(null, arguments);
};

var _GS_Show_Path_Camera_Target = Module["_GS_Show_Path_Camera_Target"] = function() {
 return (_GS_Show_Path_Camera_Target = Module["_GS_Show_Path_Camera_Target"] = Module["asm"]["Jb"]).apply(null, arguments);
};

var _GS_Dolly_Camera = Module["_GS_Dolly_Camera"] = function() {
 return (_GS_Dolly_Camera = Module["_GS_Dolly_Camera"] = Module["asm"]["Kb"]).apply(null, arguments);
};

var _GS_Roll_Camera = Module["_GS_Roll_Camera"] = function() {
 return (_GS_Roll_Camera = Module["_GS_Roll_Camera"] = Module["asm"]["Lb"]).apply(null, arguments);
};

var _GS_Zoom_Camera = Module["_GS_Zoom_Camera"] = function() {
 return (_GS_Zoom_Camera = Module["_GS_Zoom_Camera"] = Module["asm"]["Mb"]).apply(null, arguments);
};

var _GS_UnSet_Camera = Module["_GS_UnSet_Camera"] = function() {
 return (_GS_UnSet_Camera = Module["_GS_UnSet_Camera"] = Module["asm"]["Nb"]).apply(null, arguments);
};

var _GS_Set_Color = Module["_GS_Set_Color"] = function() {
 return (_GS_Set_Color = Module["_GS_Set_Color"] = Module["asm"]["Ob"]).apply(null, arguments);
};

var _GS_UnSet_Color = Module["_GS_UnSet_Color"] = function() {
 return (_GS_UnSet_Color = Module["_GS_UnSet_Color"] = Module["asm"]["Pb"]).apply(null, arguments);
};

var _GS_UnSet_One_Color = Module["_GS_UnSet_One_Color"] = function() {
 return (_GS_UnSet_One_Color = Module["_GS_UnSet_One_Color"] = Module["asm"]["Qb"]).apply(null, arguments);
};

var _GS_Show_Color = Module["_GS_Show_Color"] = function() {
 return (_GS_Show_Color = Module["_GS_Show_Color"] = Module["asm"]["Rb"]).apply(null, arguments);
};

var _GS_Show_One_Color = Module["_GS_Show_One_Color"] = function() {
 return (_GS_Show_One_Color = Module["_GS_Show_One_Color"] = Module["asm"]["Sb"]).apply(null, arguments);
};

var _GS_Show_Color_By_Value = Module["_GS_Show_Color_By_Value"] = function() {
 return (_GS_Show_Color_By_Value = Module["_GS_Show_Color_By_Value"] = Module["asm"]["Tb"]).apply(null, arguments);
};

var _GS_Set_Visibility = Module["_GS_Set_Visibility"] = function() {
 return (_GS_Set_Visibility = Module["_GS_Set_Visibility"] = Module["asm"]["Ub"]).apply(null, arguments);
};

var _GS_Show_Visibility = Module["_GS_Show_Visibility"] = function() {
 return (_GS_Show_Visibility = Module["_GS_Show_Visibility"] = Module["asm"]["Vb"]).apply(null, arguments);
};

var _GS_Show_One_Visibility = Module["_GS_Show_One_Visibility"] = function() {
 return (_GS_Show_One_Visibility = Module["_GS_Show_One_Visibility"] = Module["asm"]["Wb"]).apply(null, arguments);
};

var _GS_UnSet_Visibility = Module["_GS_UnSet_Visibility"] = function() {
 return (_GS_UnSet_Visibility = Module["_GS_UnSet_Visibility"] = Module["asm"]["Xb"]).apply(null, arguments);
};

var _GS_UnSet_One_Visibility = Module["_GS_UnSet_One_Visibility"] = function() {
 return (_GS_UnSet_One_Visibility = Module["_GS_UnSet_One_Visibility"] = Module["asm"]["Yb"]).apply(null, arguments);
};

var _GS_Set_Selectability = Module["_GS_Set_Selectability"] = function() {
 return (_GS_Set_Selectability = Module["_GS_Set_Selectability"] = Module["asm"]["Zb"]).apply(null, arguments);
};

var _GS_UnSet_Selectability = Module["_GS_UnSet_Selectability"] = function() {
 return (_GS_UnSet_Selectability = Module["_GS_UnSet_Selectability"] = Module["asm"]["_b"]).apply(null, arguments);
};

var _GS_UnSet_One_Selectability = Module["_GS_UnSet_One_Selectability"] = function() {
 return (_GS_UnSet_One_Selectability = Module["_GS_UnSet_One_Selectability"] = Module["asm"]["$b"]).apply(null, arguments);
};

var _GS_Show_Selectability = Module["_GS_Show_Selectability"] = function() {
 return (_GS_Show_Selectability = Module["_GS_Show_Selectability"] = Module["asm"]["ac"]).apply(null, arguments);
};

var _GS_Show_One_Selectability = Module["_GS_Show_One_Selectability"] = function() {
 return (_GS_Show_One_Selectability = Module["_GS_Show_One_Selectability"] = Module["asm"]["bc"]).apply(null, arguments);
};

var _GS_Set_Rendering_Options = Module["_GS_Set_Rendering_Options"] = function() {
 return (_GS_Set_Rendering_Options = Module["_GS_Set_Rendering_Options"] = Module["asm"]["cc"]).apply(null, arguments);
};

var _GS_UnSet_Rendering_Options = Module["_GS_UnSet_Rendering_Options"] = function() {
 return (_GS_UnSet_Rendering_Options = Module["_GS_UnSet_Rendering_Options"] = Module["asm"]["dc"]).apply(null, arguments);
};

var _GS_UnSet_One_Rendering_Option = Module["_GS_UnSet_One_Rendering_Option"] = function() {
 return (_GS_UnSet_One_Rendering_Option = Module["_GS_UnSet_One_Rendering_Option"] = Module["asm"]["ec"]).apply(null, arguments);
};

var _GS_Show_Rendering_Options = Module["_GS_Show_Rendering_Options"] = function() {
 return (_GS_Show_Rendering_Options = Module["_GS_Show_Rendering_Options"] = Module["asm"]["fc"]).apply(null, arguments);
};

var _GS_Show_One_Rendering_Option = Module["_GS_Show_One_Rendering_Option"] = function() {
 return (_GS_Show_One_Rendering_Option = Module["_GS_Show_One_Rendering_Option"] = Module["asm"]["gc"]).apply(null, arguments);
};

var _GS_Show_One_Path_Rendering_Option = Module["_GS_Show_One_Path_Rendering_Option"] = function() {
 return (_GS_Show_One_Path_Rendering_Option = Module["_GS_Show_One_Path_Rendering_Option"] = Module["asm"]["hc"]).apply(null, arguments);
};

var _GS_Show_One_Default_Rendering_Option = Module["_GS_Show_One_Default_Rendering_Option"] = function() {
 return (_GS_Show_One_Default_Rendering_Option = Module["_GS_Show_One_Default_Rendering_Option"] = Module["asm"]["ic"]).apply(null, arguments);
};

var _GS_Set_Heuristic_Options = Module["_GS_Set_Heuristic_Options"] = function() {
 return (_GS_Set_Heuristic_Options = Module["_GS_Set_Heuristic_Options"] = Module["asm"]["jc"]).apply(null, arguments);
};

var _GS_Set_One_Heuristic_Option = Module["_GS_Set_One_Heuristic_Option"] = function() {
 return (_GS_Set_One_Heuristic_Option = Module["_GS_Set_One_Heuristic_Option"] = Module["asm"]["kc"]).apply(null, arguments);
};

var _GS_UnSet_Heuristic_Options = Module["_GS_UnSet_Heuristic_Options"] = function() {
 return (_GS_UnSet_Heuristic_Options = Module["_GS_UnSet_Heuristic_Options"] = Module["asm"]["lc"]).apply(null, arguments);
};

var _GS_UnSet_One_Heuristic_Option = Module["_GS_UnSet_One_Heuristic_Option"] = function() {
 return (_GS_UnSet_One_Heuristic_Option = Module["_GS_UnSet_One_Heuristic_Option"] = Module["asm"]["mc"]).apply(null, arguments);
};

var _GS_Show_Heuristic_Options = Module["_GS_Show_Heuristic_Options"] = function() {
 return (_GS_Show_Heuristic_Options = Module["_GS_Show_Heuristic_Options"] = Module["asm"]["nc"]).apply(null, arguments);
};

var _GS_Show_One_Heuristic_Option = Module["_GS_Show_One_Heuristic_Option"] = function() {
 return (_GS_Show_One_Heuristic_Option = Module["_GS_Show_One_Heuristic_Option"] = Module["asm"]["oc"]).apply(null, arguments);
};

var _GS_Set_ModellingMatrix = Module["_GS_Set_ModellingMatrix"] = function() {
 return (_GS_Set_ModellingMatrix = Module["_GS_Set_ModellingMatrix"] = Module["asm"]["pc"]).apply(null, arguments);
};

var _GS_UnSet_ModellingMatrix = Module["_GS_UnSet_ModellingMatrix"] = function() {
 return (_GS_UnSet_ModellingMatrix = Module["_GS_UnSet_ModellingMatrix"] = Module["asm"]["qc"]).apply(null, arguments);
};

var _GS_Append_ModellingMatrix = Module["_GS_Append_ModellingMatrix"] = function() {
 return (_GS_Append_ModellingMatrix = Module["_GS_Append_ModellingMatrix"] = Module["asm"]["rc"]).apply(null, arguments);
};

var _GS_Show_ModellingMatrix = Module["_GS_Show_ModellingMatrix"] = function() {
 return (_GS_Show_ModellingMatrix = Module["_GS_Show_ModellingMatrix"] = Module["asm"]["sc"]).apply(null, arguments);
};

var _GS_Show_Path_ModellingMatrix = Module["_GS_Show_Path_ModellingMatrix"] = function() {
 return (_GS_Show_Path_ModellingMatrix = Module["_GS_Show_Path_ModellingMatrix"] = Module["asm"]["tc"]).apply(null, arguments);
};

var _GS_Set_Condition = Module["_GS_Set_Condition"] = function() {
 return (_GS_Set_Condition = Module["_GS_Set_Condition"] = Module["asm"]["uc"]).apply(null, arguments);
};

var _GS_UnSet_Condition = Module["_GS_UnSet_Condition"] = function() {
 return (_GS_UnSet_Condition = Module["_GS_UnSet_Condition"] = Module["asm"]["vc"]).apply(null, arguments);
};

var _GS_Show_Condition = Module["_GS_Show_Condition"] = function() {
 return (_GS_Show_Condition = Module["_GS_Show_Condition"] = Module["asm"]["wc"]).apply(null, arguments);
};

var _GS_Set_Text_Font = Module["_GS_Set_Text_Font"] = function() {
 return (_GS_Set_Text_Font = Module["_GS_Set_Text_Font"] = Module["asm"]["xc"]).apply(null, arguments);
};

var _GS_UnSet_Text_Font = Module["_GS_UnSet_Text_Font"] = function() {
 return (_GS_UnSet_Text_Font = Module["_GS_UnSet_Text_Font"] = Module["asm"]["yc"]).apply(null, arguments);
};

var _GS_UnSet_One_Text_Font = Module["_GS_UnSet_One_Text_Font"] = function() {
 return (_GS_UnSet_One_Text_Font = Module["_GS_UnSet_One_Text_Font"] = Module["asm"]["zc"]).apply(null, arguments);
};

var _GS_Show_Text_Font = Module["_GS_Show_Text_Font"] = function() {
 return (_GS_Show_Text_Font = Module["_GS_Show_Text_Font"] = Module["asm"]["Ac"]).apply(null, arguments);
};

var _GS_Show_One_Text_Font = Module["_GS_Show_One_Text_Font"] = function() {
 return (_GS_Show_One_Text_Font = Module["_GS_Show_One_Text_Font"] = Module["asm"]["Bc"]).apply(null, arguments);
};

var _GS_Attribute_Exists = Module["_GS_Attribute_Exists"] = function() {
 return (_GS_Attribute_Exists = Module["_GS_Attribute_Exists"] = Module["asm"]["Cc"]).apply(null, arguments);
};

var _GS_Make_Context_Current = Module["_GS_Make_Context_Current"] = function() {
 return (_GS_Make_Context_Current = Module["_GS_Make_Context_Current"] = Module["asm"]["Dc"]).apply(null, arguments);
};

var _GS_Show_Asyn_Buffer_Geometry_Count = Module["_GS_Show_Asyn_Buffer_Geometry_Count"] = function() {
 return (_GS_Show_Asyn_Buffer_Geometry_Count = Module["_GS_Show_Asyn_Buffer_Geometry_Count"] = Module["asm"]["Ec"]).apply(null, arguments);
};

var _GS_Show_Asyn_Buffer_Geometry_Keys = Module["_GS_Show_Asyn_Buffer_Geometry_Keys"] = function() {
 return (_GS_Show_Asyn_Buffer_Geometry_Keys = Module["_GS_Show_Asyn_Buffer_Geometry_Keys"] = Module["asm"]["Fc"]).apply(null, arguments);
};

var _GS_Show_Asyn_Unbuffer_Geometry_Count = Module["_GS_Show_Asyn_Unbuffer_Geometry_Count"] = function() {
 return (_GS_Show_Asyn_Unbuffer_Geometry_Count = Module["_GS_Show_Asyn_Unbuffer_Geometry_Count"] = Module["asm"]["Gc"]).apply(null, arguments);
};

var _GS_Show_Asyn_Unbuffer_Geometry_Keys = Module["_GS_Show_Asyn_Unbuffer_Geometry_Keys"] = function() {
 return (_GS_Show_Asyn_Unbuffer_Geometry_Keys = Module["_GS_Show_Asyn_Unbuffer_Geometry_Keys"] = Module["asm"]["Hc"]).apply(null, arguments);
};

var _GS_Show_Asyn_Geometry_Data_Count = Module["_GS_Show_Asyn_Geometry_Data_Count"] = function() {
 return (_GS_Show_Asyn_Geometry_Data_Count = Module["_GS_Show_Asyn_Geometry_Data_Count"] = Module["asm"]["Ic"]).apply(null, arguments);
};

var _GS_Show_Asyn_Remove_Geometry_Data_Count = Module["_GS_Show_Asyn_Remove_Geometry_Data_Count"] = function() {
 return (_GS_Show_Asyn_Remove_Geometry_Data_Count = Module["_GS_Show_Asyn_Remove_Geometry_Data_Count"] = Module["asm"]["Jc"]).apply(null, arguments);
};

var _GS_Show_Asyn_Geometry_Data_Keys = Module["_GS_Show_Asyn_Geometry_Data_Keys"] = function() {
 return (_GS_Show_Asyn_Geometry_Data_Keys = Module["_GS_Show_Asyn_Geometry_Data_Keys"] = Module["asm"]["Kc"]).apply(null, arguments);
};

var _GS_Show_Asyn_Remove_Geometry_Data_Keys = Module["_GS_Show_Asyn_Remove_Geometry_Data_Keys"] = function() {
 return (_GS_Show_Asyn_Remove_Geometry_Data_Keys = Module["_GS_Show_Asyn_Remove_Geometry_Data_Keys"] = Module["asm"]["Lc"]).apply(null, arguments);
};

var _gsGetError = Module["_gsGetError"] = function() {
 return (_gsGetError = Module["_gsGetError"] = Module["asm"]["Mc"]).apply(null, arguments);
};

var _GS_Init_Database = Module["_GS_Init_Database"] = function() {
 return (_GS_Init_Database = Module["_GS_Init_Database"] = Module["asm"]["Nc"]).apply(null, arguments);
};

var _GS_Fina_Database = Module["_GS_Fina_Database"] = function() {
 return (_GS_Fina_Database = Module["_GS_Fina_Database"] = Module["asm"]["Oc"]).apply(null, arguments);
};

var _GS_Update_Display = Module["_GS_Update_Display"] = function() {
 return (_GS_Update_Display = Module["_GS_Update_Display"] = Module["asm"]["Pc"]).apply(null, arguments);
};

var _GS_Update_View_Display_By_Key = Module["_GS_Update_View_Display_By_Key"] = function() {
 return (_GS_Update_View_Display_By_Key = Module["_GS_Update_View_Display_By_Key"] = Module["asm"]["Qc"]).apply(null, arguments);
};

var _GS_Update_View_Display_With_Framerate_By_Key = Module["_GS_Update_View_Display_With_Framerate_By_Key"] = function() {
 return (_GS_Update_View_Display_With_Framerate_By_Key = Module["_GS_Update_View_Display_With_Framerate_By_Key"] = Module["asm"]["Rc"]).apply(null, arguments);
};

var _GS_Update_View_Display_With_Time_By_Key = Module["_GS_Update_View_Display_With_Time_By_Key"] = function() {
 return (_GS_Update_View_Display_With_Time_By_Key = Module["_GS_Update_View_Display_With_Time_By_Key"] = Module["asm"]["Sc"]).apply(null, arguments);
};

var _GS_Asyn_Update_Geometry_Data_By_Key = Module["_GS_Asyn_Update_Geometry_Data_By_Key"] = function() {
 return (_GS_Asyn_Update_Geometry_Data_By_Key = Module["_GS_Asyn_Update_Geometry_Data_By_Key"] = Module["asm"]["Tc"]).apply(null, arguments);
};

var _GS_Asyn_Update_Geometry_By_Key = Module["_GS_Asyn_Update_Geometry_By_Key"] = function() {
 return (_GS_Asyn_Update_Geometry_By_Key = Module["_GS_Asyn_Update_Geometry_By_Key"] = Module["asm"]["Uc"]).apply(null, arguments);
};

var _GS_Asyn_Update_Camera_By_Key = Module["_GS_Asyn_Update_Camera_By_Key"] = function() {
 return (_GS_Asyn_Update_Camera_By_Key = Module["_GS_Asyn_Update_Camera_By_Key"] = Module["asm"]["Vc"]).apply(null, arguments);
};

var _GS_Asyn_Update_View_By_Key = Module["_GS_Asyn_Update_View_By_Key"] = function() {
 return (_GS_Asyn_Update_View_By_Key = Module["_GS_Asyn_Update_View_By_Key"] = Module["asm"]["Wc"]).apply(null, arguments);
};

var _GS_Asyn_Buffer_Geometry_By_Key = Module["_GS_Asyn_Buffer_Geometry_By_Key"] = function() {
 return (_GS_Asyn_Buffer_Geometry_By_Key = Module["_GS_Asyn_Buffer_Geometry_By_Key"] = Module["asm"]["Xc"]).apply(null, arguments);
};

var _GS_Asyn_Unbuffer_Geometry_By_Key = Module["_GS_Asyn_Unbuffer_Geometry_By_Key"] = function() {
 return (_GS_Asyn_Unbuffer_Geometry_By_Key = Module["_GS_Asyn_Unbuffer_Geometry_By_Key"] = Module["asm"]["Yc"]).apply(null, arguments);
};

var _GS_Asyn_Render_View_By_Key = Module["_GS_Asyn_Render_View_By_Key"] = function() {
 return (_GS_Asyn_Render_View_By_Key = Module["_GS_Asyn_Render_View_By_Key"] = Module["asm"]["Zc"]).apply(null, arguments);
};

var _GS_Asyn_Need_Update_View_By_Key = Module["_GS_Asyn_Need_Update_View_By_Key"] = function() {
 return (_GS_Asyn_Need_Update_View_By_Key = Module["_GS_Asyn_Need_Update_View_By_Key"] = Module["asm"]["_c"]).apply(null, arguments);
};

var _GS_Save_Segment = Module["_GS_Save_Segment"] = function() {
 return (_GS_Save_Segment = Module["_GS_Save_Segment"] = Module["asm"]["$c"]).apply(null, arguments);
};

var _GS_Save_Segment_By_Key = Module["_GS_Save_Segment_By_Key"] = function() {
 return (_GS_Save_Segment_By_Key = Module["_GS_Save_Segment_By_Key"] = Module["asm"]["ad"]).apply(null, arguments);
};

var _GS_Load_Segment = Module["_GS_Load_Segment"] = function() {
 return (_GS_Load_Segment = Module["_GS_Load_Segment"] = Module["asm"]["bd"]).apply(null, arguments);
};

var _GS_Load_Segment_With_Compression = Module["_GS_Load_Segment_With_Compression"] = function() {
 return (_GS_Load_Segment_With_Compression = Module["_GS_Load_Segment_With_Compression"] = Module["asm"]["cd"]).apply(null, arguments);
};

var _GS_Load_Segment_By_Key = Module["_GS_Load_Segment_By_Key"] = function() {
 return (_GS_Load_Segment_By_Key = Module["_GS_Load_Segment_By_Key"] = Module["asm"]["dd"]).apply(null, arguments);
};

var _GS_Load_Segment_With_Compression_By_Key = Module["_GS_Load_Segment_With_Compression_By_Key"] = function() {
 return (_GS_Load_Segment_With_Compression_By_Key = Module["_GS_Load_Segment_With_Compression_By_Key"] = Module["asm"]["ed"]).apply(null, arguments);
};

var _GS_Segment_To_Stream = Module["_GS_Segment_To_Stream"] = function() {
 return (_GS_Segment_To_Stream = Module["_GS_Segment_To_Stream"] = Module["asm"]["fd"]).apply(null, arguments);
};

var _GS_Segment_To_Stream_By_Key = Module["_GS_Segment_To_Stream_By_Key"] = function() {
 return (_GS_Segment_To_Stream_By_Key = Module["_GS_Segment_To_Stream_By_Key"] = Module["asm"]["gd"]).apply(null, arguments);
};

var _GS_Segment_To_Stream_With_Compression = Module["_GS_Segment_To_Stream_With_Compression"] = function() {
 return (_GS_Segment_To_Stream_With_Compression = Module["_GS_Segment_To_Stream_With_Compression"] = Module["asm"]["hd"]).apply(null, arguments);
};

var _GS_Segment_To_Stream_With_Compression_By_Key = Module["_GS_Segment_To_Stream_With_Compression_By_Key"] = function() {
 return (_GS_Segment_To_Stream_With_Compression_By_Key = Module["_GS_Segment_To_Stream_With_Compression_By_Key"] = Module["asm"]["id"]).apply(null, arguments);
};

var _GS_Stream_To_Segment = Module["_GS_Stream_To_Segment"] = function() {
 return (_GS_Stream_To_Segment = Module["_GS_Stream_To_Segment"] = Module["asm"]["jd"]).apply(null, arguments);
};

var _GS_Stream_To_Segment_By_Key = Module["_GS_Stream_To_Segment_By_Key"] = function() {
 return (_GS_Stream_To_Segment_By_Key = Module["_GS_Stream_To_Segment_By_Key"] = Module["asm"]["kd"]).apply(null, arguments);
};

var _GS_Stream_With_Compression_To_Segment = Module["_GS_Stream_With_Compression_To_Segment"] = function() {
 return (_GS_Stream_With_Compression_To_Segment = Module["_GS_Stream_With_Compression_To_Segment"] = Module["asm"]["ld"]).apply(null, arguments);
};

var _GS_Stream_With_Compression_To_Segment_By_Key = Module["_GS_Stream_With_Compression_To_Segment_By_Key"] = function() {
 return (_GS_Stream_With_Compression_To_Segment_By_Key = Module["_GS_Stream_With_Compression_To_Segment_By_Key"] = Module["asm"]["md"]).apply(null, arguments);
};

var _GS_Segment_Data_To_Stream = Module["_GS_Segment_Data_To_Stream"] = function() {
 return (_GS_Segment_Data_To_Stream = Module["_GS_Segment_Data_To_Stream"] = Module["asm"]["nd"]).apply(null, arguments);
};

var _GS_Stream_To_Segment_Data = Module["_GS_Stream_To_Segment_Data"] = function() {
 return (_GS_Stream_To_Segment_Data = Module["_GS_Stream_To_Segment_Data"] = Module["asm"]["od"]).apply(null, arguments);
};

var _GS_Geometry_Data_To_Stream = Module["_GS_Geometry_Data_To_Stream"] = function() {
 return (_GS_Geometry_Data_To_Stream = Module["_GS_Geometry_Data_To_Stream"] = Module["asm"]["pd"]).apply(null, arguments);
};

var _GS_Geometry_Data_To_Stream_With_Compression = Module["_GS_Geometry_Data_To_Stream_With_Compression"] = function() {
 return (_GS_Geometry_Data_To_Stream_With_Compression = Module["_GS_Geometry_Data_To_Stream_With_Compression"] = Module["asm"]["qd"]).apply(null, arguments);
};

var _GS_Stream_To_Geometry_Data_With_Compression = Module["_GS_Stream_To_Geometry_Data_With_Compression"] = function() {
 return (_GS_Stream_To_Geometry_Data_With_Compression = Module["_GS_Stream_To_Geometry_Data_With_Compression"] = Module["asm"]["rd"]).apply(null, arguments);
};

var _GS_Stream_To_Geometry_Data = Module["_GS_Stream_To_Geometry_Data"] = function() {
 return (_GS_Stream_To_Geometry_Data = Module["_GS_Stream_To_Geometry_Data"] = Module["asm"]["sd"]).apply(null, arguments);
};

var _GS_Stream_To_Geometry_Data_By_Key = Module["_GS_Stream_To_Geometry_Data_By_Key"] = function() {
 return (_GS_Stream_To_Geometry_Data_By_Key = Module["_GS_Stream_To_Geometry_Data_By_Key"] = Module["asm"]["td"]).apply(null, arguments);
};

var _GS_Stream_To_Geometry_Data_By_Keys = Module["_GS_Stream_To_Geometry_Data_By_Keys"] = function() {
 return (_GS_Stream_To_Geometry_Data_By_Keys = Module["_GS_Stream_To_Geometry_Data_By_Keys"] = Module["asm"]["ud"]).apply(null, arguments);
};

var _GS_Copy_Segment_By_Key = Module["_GS_Copy_Segment_By_Key"] = function() {
 return (_GS_Copy_Segment_By_Key = Module["_GS_Copy_Segment_By_Key"] = Module["asm"]["vd"]).apply(null, arguments);
};

var _GS_Compress_File = Module["_GS_Compress_File"] = function() {
 return (_GS_Compress_File = Module["_GS_Compress_File"] = Module["asm"]["wd"]).apply(null, arguments);
};

var _GS_Define_Error_Handler = Module["_GS_Define_Error_Handler"] = function() {
 return (_GS_Define_Error_Handler = Module["_GS_Define_Error_Handler"] = Module["asm"]["xd"]).apply(null, arguments);
};

var _GS_Define_Log_Handler = Module["_GS_Define_Log_Handler"] = function() {
 return (_GS_Define_Log_Handler = Module["_GS_Define_Log_Handler"] = Module["asm"]["yd"]).apply(null, arguments);
};

var _GS_Show_Database_Info = Module["_GS_Show_Database_Info"] = function() {
 return (_GS_Show_Database_Info = Module["_GS_Show_Database_Info"] = Module["asm"]["zd"]).apply(null, arguments);
};

var _GS_Show_Allocated_Memory_Size = Module["_GS_Show_Allocated_Memory_Size"] = function() {
 return (_GS_Show_Allocated_Memory_Size = Module["_GS_Show_Allocated_Memory_Size"] = Module["asm"]["Ad"]).apply(null, arguments);
};

var _GS_Insert_Marker = Module["_GS_Insert_Marker"] = function() {
 return (_GS_Insert_Marker = Module["_GS_Insert_Marker"] = Module["asm"]["Bd"]).apply(null, arguments);
};

var _GS_Edit_Marker = Module["_GS_Edit_Marker"] = function() {
 return (_GS_Edit_Marker = Module["_GS_Edit_Marker"] = Module["asm"]["Cd"]).apply(null, arguments);
};

var _GS_Show_Marker = Module["_GS_Show_Marker"] = function() {
 return (_GS_Show_Marker = Module["_GS_Show_Marker"] = Module["asm"]["Dd"]).apply(null, arguments);
};

var _GS_Insert_Point_Cloud = Module["_GS_Insert_Point_Cloud"] = function() {
 return (_GS_Insert_Point_Cloud = Module["_GS_Insert_Point_Cloud"] = Module["asm"]["Ed"]).apply(null, arguments);
};

var _GS_Edit_Point_Cloud = Module["_GS_Edit_Point_Cloud"] = function() {
 return (_GS_Edit_Point_Cloud = Module["_GS_Edit_Point_Cloud"] = Module["asm"]["Fd"]).apply(null, arguments);
};

var _GS_Show_Point_Cloud_Count = Module["_GS_Show_Point_Cloud_Count"] = function() {
 return (_GS_Show_Point_Cloud_Count = Module["_GS_Show_Point_Cloud_Count"] = Module["asm"]["Gd"]).apply(null, arguments);
};

var _GS_Show_Point_Cloud = Module["_GS_Show_Point_Cloud"] = function() {
 return (_GS_Show_Point_Cloud = Module["_GS_Show_Point_Cloud"] = Module["asm"]["Hd"]).apply(null, arguments);
};

var _GS_Insert_Line = Module["_GS_Insert_Line"] = function() {
 return (_GS_Insert_Line = Module["_GS_Insert_Line"] = Module["asm"]["Id"]).apply(null, arguments);
};

var _GS_Show_Line = Module["_GS_Show_Line"] = function() {
 return (_GS_Show_Line = Module["_GS_Show_Line"] = Module["asm"]["Jd"]).apply(null, arguments);
};

var _GS_Edit_Line = Module["_GS_Edit_Line"] = function() {
 return (_GS_Edit_Line = Module["_GS_Edit_Line"] = Module["asm"]["Kd"]).apply(null, arguments);
};

var _GS_Insert_Polyline = Module["_GS_Insert_Polyline"] = function() {
 return (_GS_Insert_Polyline = Module["_GS_Insert_Polyline"] = Module["asm"]["Ld"]).apply(null, arguments);
};

var _GS_Show_Polyline = Module["_GS_Show_Polyline"] = function() {
 return (_GS_Show_Polyline = Module["_GS_Show_Polyline"] = Module["asm"]["Md"]).apply(null, arguments);
};

var _GS_Show_Polyline_Count = Module["_GS_Show_Polyline_Count"] = function() {
 return (_GS_Show_Polyline_Count = Module["_GS_Show_Polyline_Count"] = Module["asm"]["Nd"]).apply(null, arguments);
};

var _GS_Edit_Polyline = Module["_GS_Edit_Polyline"] = function() {
 return (_GS_Edit_Polyline = Module["_GS_Edit_Polyline"] = Module["asm"]["Od"]).apply(null, arguments);
};

var _GS_Insert_Circular_Arc = Module["_GS_Insert_Circular_Arc"] = function() {
 return (_GS_Insert_Circular_Arc = Module["_GS_Insert_Circular_Arc"] = Module["asm"]["Pd"]).apply(null, arguments);
};

var _GS_Show_Circular_Arc = Module["_GS_Show_Circular_Arc"] = function() {
 return (_GS_Show_Circular_Arc = Module["_GS_Show_Circular_Arc"] = Module["asm"]["Qd"]).apply(null, arguments);
};

var _GS_Edit_Circular_Arc = Module["_GS_Edit_Circular_Arc"] = function() {
 return (_GS_Edit_Circular_Arc = Module["_GS_Edit_Circular_Arc"] = Module["asm"]["Rd"]).apply(null, arguments);
};

var _GS_Insert_Ellipse_Arc = Module["_GS_Insert_Ellipse_Arc"] = function() {
 return (_GS_Insert_Ellipse_Arc = Module["_GS_Insert_Ellipse_Arc"] = Module["asm"]["Sd"]).apply(null, arguments);
};

var _GS_Show_Ellipse_Arc = Module["_GS_Show_Ellipse_Arc"] = function() {
 return (_GS_Show_Ellipse_Arc = Module["_GS_Show_Ellipse_Arc"] = Module["asm"]["Td"]).apply(null, arguments);
};

var _GS_Edit_Ellipse_Arc = Module["_GS_Edit_Ellipse_Arc"] = function() {
 return (_GS_Edit_Ellipse_Arc = Module["_GS_Edit_Ellipse_Arc"] = Module["asm"]["Ud"]).apply(null, arguments);
};

var _GS_Insert_Circle = Module["_GS_Insert_Circle"] = function() {
 return (_GS_Insert_Circle = Module["_GS_Insert_Circle"] = Module["asm"]["Vd"]).apply(null, arguments);
};

var _GS_Show_Circle = Module["_GS_Show_Circle"] = function() {
 return (_GS_Show_Circle = Module["_GS_Show_Circle"] = Module["asm"]["Wd"]).apply(null, arguments);
};

var _GS_Edit_Circle = Module["_GS_Edit_Circle"] = function() {
 return (_GS_Edit_Circle = Module["_GS_Edit_Circle"] = Module["asm"]["Xd"]).apply(null, arguments);
};

var _GS_Insert_Ellipse = Module["_GS_Insert_Ellipse"] = function() {
 return (_GS_Insert_Ellipse = Module["_GS_Insert_Ellipse"] = Module["asm"]["Yd"]).apply(null, arguments);
};

var _GS_Show_Ellipse = Module["_GS_Show_Ellipse"] = function() {
 return (_GS_Show_Ellipse = Module["_GS_Show_Ellipse"] = Module["asm"]["Zd"]).apply(null, arguments);
};

var _GS_Edit_Ellipse = Module["_GS_Edit_Ellipse"] = function() {
 return (_GS_Edit_Ellipse = Module["_GS_Edit_Ellipse"] = Module["asm"]["_d"]).apply(null, arguments);
};

var _GS_Insert_Cylinder = Module["_GS_Insert_Cylinder"] = function() {
 return (_GS_Insert_Cylinder = Module["_GS_Insert_Cylinder"] = Module["asm"]["$d"]).apply(null, arguments);
};

var _GS_Show_Cylinder = Module["_GS_Show_Cylinder"] = function() {
 return (_GS_Show_Cylinder = Module["_GS_Show_Cylinder"] = Module["asm"]["ae"]).apply(null, arguments);
};

var _GS_Edit_Cylinder = Module["_GS_Edit_Cylinder"] = function() {
 return (_GS_Edit_Cylinder = Module["_GS_Edit_Cylinder"] = Module["asm"]["be"]).apply(null, arguments);
};

var _GS_Insert_PolyCylinder = Module["_GS_Insert_PolyCylinder"] = function() {
 return (_GS_Insert_PolyCylinder = Module["_GS_Insert_PolyCylinder"] = Module["asm"]["ce"]).apply(null, arguments);
};

var _GS_Show_PolyCylinder_Count = Module["_GS_Show_PolyCylinder_Count"] = function() {
 return (_GS_Show_PolyCylinder_Count = Module["_GS_Show_PolyCylinder_Count"] = Module["asm"]["de"]).apply(null, arguments);
};

var _GS_Show_PolyCylinder = Module["_GS_Show_PolyCylinder"] = function() {
 return (_GS_Show_PolyCylinder = Module["_GS_Show_PolyCylinder"] = Module["asm"]["ee"]).apply(null, arguments);
};

var _GS_Edit_PolyCylinder = Module["_GS_Edit_PolyCylinder"] = function() {
 return (_GS_Edit_PolyCylinder = Module["_GS_Edit_PolyCylinder"] = Module["asm"]["fe"]).apply(null, arguments);
};

var _GS_Insert_Shell = Module["_GS_Insert_Shell"] = function() {
 return (_GS_Insert_Shell = Module["_GS_Insert_Shell"] = Module["asm"]["ge"]).apply(null, arguments);
};

var _GS_Edit_Shell = Module["_GS_Edit_Shell"] = function() {
 return (_GS_Edit_Shell = Module["_GS_Edit_Shell"] = Module["asm"]["he"]).apply(null, arguments);
};

var _GS_Show_Shell = Module["_GS_Show_Shell"] = function() {
 return (_GS_Show_Shell = Module["_GS_Show_Shell"] = Module["asm"]["ie"]).apply(null, arguments);
};

var _GS_Show_Shell_Size = Module["_GS_Show_Shell_Size"] = function() {
 return (_GS_Show_Shell_Size = Module["_GS_Show_Shell_Size"] = Module["asm"]["je"]).apply(null, arguments);
};

var _GS_Insert_Triangular_Shell = Module["_GS_Insert_Triangular_Shell"] = function() {
 return (_GS_Insert_Triangular_Shell = Module["_GS_Insert_Triangular_Shell"] = Module["asm"]["ke"]).apply(null, arguments);
};

var _GS_Insert_Mesh = Module["_GS_Insert_Mesh"] = function() {
 return (_GS_Insert_Mesh = Module["_GS_Insert_Mesh"] = Module["asm"]["le"]).apply(null, arguments);
};

var _GS_Edit_Mesh_Points = Module["_GS_Edit_Mesh_Points"] = function() {
 return (_GS_Edit_Mesh_Points = Module["_GS_Edit_Mesh_Points"] = Module["asm"]["me"]).apply(null, arguments);
};

var _GS_Show_Mesh_Size = Module["_GS_Show_Mesh_Size"] = function() {
 return (_GS_Show_Mesh_Size = Module["_GS_Show_Mesh_Size"] = Module["asm"]["ne"]).apply(null, arguments);
};

var _GS_Show_Mesh = Module["_GS_Show_Mesh"] = function() {
 return (_GS_Show_Mesh = Module["_GS_Show_Mesh"] = Module["asm"]["oe"]).apply(null, arguments);
};

var _GS_Insert_Light = Module["_GS_Insert_Light"] = function() {
 return (_GS_Insert_Light = Module["_GS_Insert_Light"] = Module["asm"]["pe"]).apply(null, arguments);
};

var _GS_Edit_Light = Module["_GS_Edit_Light"] = function() {
 return (_GS_Edit_Light = Module["_GS_Edit_Light"] = Module["asm"]["qe"]).apply(null, arguments);
};

var _GS_Show_Light = Module["_GS_Show_Light"] = function() {
 return (_GS_Show_Light = Module["_GS_Show_Light"] = Module["asm"]["re"]).apply(null, arguments);
};

var _GS_Insert_Image = Module["_GS_Insert_Image"] = function() {
 return (_GS_Insert_Image = Module["_GS_Insert_Image"] = Module["asm"]["se"]).apply(null, arguments);
};

var _GS_Set_Image_Options = Module["_GS_Set_Image_Options"] = function() {
 return (_GS_Set_Image_Options = Module["_GS_Set_Image_Options"] = Module["asm"]["te"]).apply(null, arguments);
};

var _GS_UnSet_One_Image_Option = Module["_GS_UnSet_One_Image_Option"] = function() {
 return (_GS_UnSet_One_Image_Option = Module["_GS_UnSet_One_Image_Option"] = Module["asm"]["ue"]).apply(null, arguments);
};

var _GS_Set_Image_Data = Module["_GS_Set_Image_Data"] = function() {
 return (_GS_Set_Image_Data = Module["_GS_Set_Image_Data"] = Module["asm"]["ve"]).apply(null, arguments);
};

var _GS_UnSet_Image_Data = Module["_GS_UnSet_Image_Data"] = function() {
 return (_GS_UnSet_Image_Data = Module["_GS_UnSet_Image_Data"] = Module["asm"]["we"]).apply(null, arguments);
};

var _GS_Show_Image_Position = Module["_GS_Show_Image_Position"] = function() {
 return (_GS_Show_Image_Position = Module["_GS_Show_Image_Position"] = Module["asm"]["xe"]).apply(null, arguments);
};

var _GS_Show_Image_Size = Module["_GS_Show_Image_Size"] = function() {
 return (_GS_Show_Image_Size = Module["_GS_Show_Image_Size"] = Module["asm"]["ye"]).apply(null, arguments);
};

var _GS_Show_Image_Data_Size = Module["_GS_Show_Image_Data_Size"] = function() {
 return (_GS_Show_Image_Data_Size = Module["_GS_Show_Image_Data_Size"] = Module["asm"]["ze"]).apply(null, arguments);
};

var _GS_Show_Image_Data = Module["_GS_Show_Image_Data"] = function() {
 return (_GS_Show_Image_Data = Module["_GS_Show_Image_Data"] = Module["asm"]["Ae"]).apply(null, arguments);
};

var _GS_Show_Image_Options = Module["_GS_Show_Image_Options"] = function() {
 return (_GS_Show_Image_Options = Module["_GS_Show_Image_Options"] = Module["asm"]["Be"]).apply(null, arguments);
};

var _GS_Show_One_Image_Option = Module["_GS_Show_One_Image_Option"] = function() {
 return (_GS_Show_One_Image_Option = Module["_GS_Show_One_Image_Option"] = Module["asm"]["Ce"]).apply(null, arguments);
};

var _GS_Show_Image = Module["_GS_Show_Image"] = function() {
 return (_GS_Show_Image = Module["_GS_Show_Image"] = Module["asm"]["De"]).apply(null, arguments);
};

var _GS_Insert_Cutting_Planes = Module["_GS_Insert_Cutting_Planes"] = function() {
 return (_GS_Insert_Cutting_Planes = Module["_GS_Insert_Cutting_Planes"] = Module["asm"]["Ee"]).apply(null, arguments);
};

var _GS_Edit_Cutting_Planes = Module["_GS_Edit_Cutting_Planes"] = function() {
 return (_GS_Edit_Cutting_Planes = Module["_GS_Edit_Cutting_Planes"] = Module["asm"]["Fe"]).apply(null, arguments);
};

var _GS_Show_Cutting_Planes = Module["_GS_Show_Cutting_Planes"] = function() {
 return (_GS_Show_Cutting_Planes = Module["_GS_Show_Cutting_Planes"] = Module["asm"]["Ge"]).apply(null, arguments);
};

var _GS_Image_Exists = Module["_GS_Image_Exists"] = function() {
 return (_GS_Image_Exists = Module["_GS_Image_Exists"] = Module["asm"]["He"]).apply(null, arguments);
};

var _GS_Set_Geometry_Color = Module["_GS_Set_Geometry_Color"] = function() {
 return (_GS_Set_Geometry_Color = Module["_GS_Set_Geometry_Color"] = Module["asm"]["Ie"]).apply(null, arguments);
};

var _GS_Set_Geometry_Color_By_Value = Module["_GS_Set_Geometry_Color_By_Value"] = function() {
 return (_GS_Set_Geometry_Color_By_Value = Module["_GS_Set_Geometry_Color_By_Value"] = Module["asm"]["Je"]).apply(null, arguments);
};

var _GS_Show_Geometry_Color_Type = Module["_GS_Show_Geometry_Color_Type"] = function() {
 return (_GS_Show_Geometry_Color_Type = Module["_GS_Show_Geometry_Color_Type"] = Module["asm"]["Ke"]).apply(null, arguments);
};

var _GS_Show_Geometry_Color_By_Value = Module["_GS_Show_Geometry_Color_By_Value"] = function() {
 return (_GS_Show_Geometry_Color_By_Value = Module["_GS_Show_Geometry_Color_By_Value"] = Module["asm"]["Le"]).apply(null, arguments);
};

var _GS_UnSet_Geometry_Color = Module["_GS_UnSet_Geometry_Color"] = function() {
 return (_GS_UnSet_Geometry_Color = Module["_GS_UnSet_Geometry_Color"] = Module["asm"]["Me"]).apply(null, arguments);
};

var _GS_Show_Geometry_Vertices_Position_By_Indexes = Module["_GS_Show_Geometry_Vertices_Position_By_Indexes"] = function() {
 return (_GS_Show_Geometry_Vertices_Position_By_Indexes = Module["_GS_Show_Geometry_Vertices_Position_By_Indexes"] = Module["asm"]["Ne"]).apply(null, arguments);
};

var _GS_Show_Geometry_Element_Type = Module["_GS_Show_Geometry_Element_Type"] = function() {
 return (_GS_Show_Geometry_Element_Type = Module["_GS_Show_Geometry_Element_Type"] = Module["asm"]["Oe"]).apply(null, arguments);
};

var _GS_Set_Geometry_Texture_Coords = Module["_GS_Set_Geometry_Texture_Coords"] = function() {
 return (_GS_Set_Geometry_Texture_Coords = Module["_GS_Set_Geometry_Texture_Coords"] = Module["asm"]["Pe"]).apply(null, arguments);
};

var _GS_Show_Geometry_Texture_Coords = Module["_GS_Show_Geometry_Texture_Coords"] = function() {
 return (_GS_Show_Geometry_Texture_Coords = Module["_GS_Show_Geometry_Texture_Coords"] = Module["asm"]["Qe"]).apply(null, arguments);
};

var _GS_UnSet_Geometry_Texture_Coords = Module["_GS_UnSet_Geometry_Texture_Coords"] = function() {
 return (_GS_UnSet_Geometry_Texture_Coords = Module["_GS_UnSet_Geometry_Texture_Coords"] = Module["asm"]["Re"]).apply(null, arguments);
};

var _GS_Set_Geometry_Normals = Module["_GS_Set_Geometry_Normals"] = function() {
 return (_GS_Set_Geometry_Normals = Module["_GS_Set_Geometry_Normals"] = Module["asm"]["Se"]).apply(null, arguments);
};

var _GS_Show_Geometry_Normals = Module["_GS_Show_Geometry_Normals"] = function() {
 return (_GS_Show_Geometry_Normals = Module["_GS_Show_Geometry_Normals"] = Module["asm"]["Te"]).apply(null, arguments);
};

var _GS_UnSet_Geometry_Normals = Module["_GS_UnSet_Geometry_Normals"] = function() {
 return (_GS_UnSet_Geometry_Normals = Module["_GS_UnSet_Geometry_Normals"] = Module["asm"]["Ue"]).apply(null, arguments);
};

var _GS_Apply_ModellingMatrix = Module["_GS_Apply_ModellingMatrix"] = function() {
 return (_GS_Apply_ModellingMatrix = Module["_GS_Apply_ModellingMatrix"] = Module["asm"]["Ve"]).apply(null, arguments);
};

var _GS_Merge_Shell = Module["_GS_Merge_Shell"] = function() {
 return (_GS_Merge_Shell = Module["_GS_Merge_Shell"] = Module["asm"]["We"]).apply(null, arguments);
};

var _GS_Insert_Vector_Text = Module["_GS_Insert_Vector_Text"] = function() {
 return (_GS_Insert_Vector_Text = Module["_GS_Insert_Vector_Text"] = Module["asm"]["Xe"]).apply(null, arguments);
};

var _GS_Extrude_By_Shell = Module["_GS_Extrude_By_Shell"] = function() {
 return (_GS_Extrude_By_Shell = Module["_GS_Extrude_By_Shell"] = Module["asm"]["Ye"]).apply(null, arguments);
};

var _GS_DExtrude_By_Shell = Module["_GS_DExtrude_By_Shell"] = function() {
 return (_GS_DExtrude_By_Shell = Module["_GS_DExtrude_By_Shell"] = Module["asm"]["Ze"]).apply(null, arguments);
};

var _GS_Rotate_By_Shell = Module["_GS_Rotate_By_Shell"] = function() {
 return (_GS_Rotate_By_Shell = Module["_GS_Rotate_By_Shell"] = Module["asm"]["_e"]).apply(null, arguments);
};

var _GS_DRotate_By_Shell = Module["_GS_DRotate_By_Shell"] = function() {
 return (_GS_DRotate_By_Shell = Module["_GS_DRotate_By_Shell"] = Module["asm"]["$e"]).apply(null, arguments);
};

var _GS_Sweep_By_Shell = Module["_GS_Sweep_By_Shell"] = function() {
 return (_GS_Sweep_By_Shell = Module["_GS_Sweep_By_Shell"] = Module["asm"]["af"]).apply(null, arguments);
};

var _GS_DSweep_By_Shell = Module["_GS_DSweep_By_Shell"] = function() {
 return (_GS_DSweep_By_Shell = Module["_GS_DSweep_By_Shell"] = Module["asm"]["bf"]).apply(null, arguments);
};

var _GS_Compute_Geometry_Intersection = Module["_GS_Compute_Geometry_Intersection"] = function() {
 return (_GS_Compute_Geometry_Intersection = Module["_GS_Compute_Geometry_Intersection"] = Module["asm"]["cf"]).apply(null, arguments);
};

var _GS_Compute_Geometry_Tessellate_Data = Module["_GS_Compute_Geometry_Tessellate_Data"] = function() {
 return (_GS_Compute_Geometry_Tessellate_Data = Module["_GS_Compute_Geometry_Tessellate_Data"] = Module["asm"]["df"]).apply(null, arguments);
};

var _GS_Show_Geometry_Tessellate_Data_Count = Module["_GS_Show_Geometry_Tessellate_Data_Count"] = function() {
 return (_GS_Show_Geometry_Tessellate_Data_Count = Module["_GS_Show_Geometry_Tessellate_Data_Count"] = Module["asm"]["ef"]).apply(null, arguments);
};

var _GS_Show_Geometry_Tessellate_Data = Module["_GS_Show_Geometry_Tessellate_Data"] = function() {
 return (_GS_Show_Geometry_Tessellate_Data = Module["_GS_Show_Geometry_Tessellate_Data"] = Module["asm"]["ff"]).apply(null, arguments);
};

var _GS_Clear_Geometry_Tessellate_Data = Module["_GS_Clear_Geometry_Tessellate_Data"] = function() {
 return (_GS_Clear_Geometry_Tessellate_Data = Module["_GS_Clear_Geometry_Tessellate_Data"] = Module["asm"]["gf"]).apply(null, arguments);
};

var _GS_Compute_Polygon_Area = Module["_GS_Compute_Polygon_Area"] = function() {
 return (_GS_Compute_Polygon_Area = Module["_GS_Compute_Polygon_Area"] = Module["asm"]["hf"]).apply(null, arguments);
};

var _GS_Compute_Geometry_Area = Module["_GS_Compute_Geometry_Area"] = function() {
 return (_GS_Compute_Geometry_Area = Module["_GS_Compute_Geometry_Area"] = Module["asm"]["jf"]).apply(null, arguments);
};

var _GS_Insert_Parametric_Geometries = Module["_GS_Insert_Parametric_Geometries"] = function() {
 return (_GS_Insert_Parametric_Geometries = Module["_GS_Insert_Parametric_Geometries"] = Module["asm"]["kf"]).apply(null, arguments);
};

var _GS_Show_Parametric_Geometries = Module["_GS_Show_Parametric_Geometries"] = function() {
 return (_GS_Show_Parametric_Geometries = Module["_GS_Show_Parametric_Geometries"] = Module["asm"]["lf"]).apply(null, arguments);
};

var _GS_Show_Parametric_Geometries_Counts = Module["_GS_Show_Parametric_Geometries_Counts"] = function() {
 return (_GS_Show_Parametric_Geometries_Counts = Module["_GS_Show_Parametric_Geometries_Counts"] = Module["asm"]["mf"]).apply(null, arguments);
};

var _GS_Insert_Parametric_Geometry = Module["_GS_Insert_Parametric_Geometry"] = function() {
 return (_GS_Insert_Parametric_Geometry = Module["_GS_Insert_Parametric_Geometry"] = Module["asm"]["nf"]).apply(null, arguments);
};

var _GS_Edit_Parametric_Geometry = Module["_GS_Edit_Parametric_Geometry"] = function() {
 return (_GS_Edit_Parametric_Geometry = Module["_GS_Edit_Parametric_Geometry"] = Module["asm"]["of"]).apply(null, arguments);
};

var _GS_Show_Parametric_Geometry = Module["_GS_Show_Parametric_Geometry"] = function() {
 return (_GS_Show_Parametric_Geometry = Module["_GS_Show_Parametric_Geometry"] = Module["asm"]["pf"]).apply(null, arguments);
};

var _GS_Resize_By_Key = Module["_GS_Resize_By_Key"] = function() {
 return (_GS_Resize_By_Key = Module["_GS_Resize_By_Key"] = Module["asm"]["qf"]).apply(null, arguments);
};

var _GS_Show_Key_Type = Module["_GS_Show_Key_Type"] = function() {
 return (_GS_Show_Key_Type = Module["_GS_Show_Key_Type"] = Module["asm"]["rf"]).apply(null, arguments);
};

var _GS_Is_Valid_Key = Module["_GS_Is_Valid_Key"] = function() {
 return (_GS_Is_Valid_Key = Module["_GS_Is_Valid_Key"] = Module["asm"]["sf"]).apply(null, arguments);
};

var _GS_Show_Owner_By_Key = Module["_GS_Show_Owner_By_Key"] = function() {
 return (_GS_Show_Owner_By_Key = Module["_GS_Show_Owner_By_Key"] = Module["asm"]["tf"]).apply(null, arguments);
};

var _GS_Open_Segment = Module["_GS_Open_Segment"] = function() {
 return (_GS_Open_Segment = Module["_GS_Open_Segment"] = Module["asm"]["uf"]).apply(null, arguments);
};

var _GS_Open_Segment_By_Key = Module["_GS_Open_Segment_By_Key"] = function() {
 return (_GS_Open_Segment_By_Key = Module["_GS_Open_Segment_By_Key"] = Module["asm"]["vf"]).apply(null, arguments);
};

var _GS_Close_Segment = Module["_GS_Close_Segment"] = function() {
 return (_GS_Close_Segment = Module["_GS_Close_Segment"] = Module["asm"]["wf"]).apply(null, arguments);
};

var _GS_Delete_Segment = Module["_GS_Delete_Segment"] = function() {
 return (_GS_Delete_Segment = Module["_GS_Delete_Segment"] = Module["asm"]["xf"]).apply(null, arguments);
};

var _GS_Clear_Attributes = Module["_GS_Clear_Attributes"] = function() {
 return (_GS_Clear_Attributes = Module["_GS_Clear_Attributes"] = Module["asm"]["yf"]).apply(null, arguments);
};

var _GS_Clear_Attributes_By_Key = Module["_GS_Clear_Attributes_By_Key"] = function() {
 return (_GS_Clear_Attributes_By_Key = Module["_GS_Clear_Attributes_By_Key"] = Module["asm"]["zf"]).apply(null, arguments);
};

var _GS_Clear_Includes = Module["_GS_Clear_Includes"] = function() {
 return (_GS_Clear_Includes = Module["_GS_Clear_Includes"] = Module["asm"]["Af"]).apply(null, arguments);
};

var _GS_Clear_Includes_By_Key = Module["_GS_Clear_Includes_By_Key"] = function() {
 return (_GS_Clear_Includes_By_Key = Module["_GS_Clear_Includes_By_Key"] = Module["asm"]["Bf"]).apply(null, arguments);
};

var _GS_Clear_Styles = Module["_GS_Clear_Styles"] = function() {
 return (_GS_Clear_Styles = Module["_GS_Clear_Styles"] = Module["asm"]["Cf"]).apply(null, arguments);
};

var _GS_Clear_Styles_By_Key = Module["_GS_Clear_Styles_By_Key"] = function() {
 return (_GS_Clear_Styles_By_Key = Module["_GS_Clear_Styles_By_Key"] = Module["asm"]["Df"]).apply(null, arguments);
};

var _GS_Clear_Subsegments = Module["_GS_Clear_Subsegments"] = function() {
 return (_GS_Clear_Subsegments = Module["_GS_Clear_Subsegments"] = Module["asm"]["Ef"]).apply(null, arguments);
};

var _GS_Clear_Subsegments_By_Key = Module["_GS_Clear_Subsegments_By_Key"] = function() {
 return (_GS_Clear_Subsegments_By_Key = Module["_GS_Clear_Subsegments_By_Key"] = Module["asm"]["Ff"]).apply(null, arguments);
};

var _GS_Clear_Data = Module["_GS_Clear_Data"] = function() {
 return (_GS_Clear_Data = Module["_GS_Clear_Data"] = Module["asm"]["Gf"]).apply(null, arguments);
};

var _GS_Clear_Data_By_Key = Module["_GS_Clear_Data_By_Key"] = function() {
 return (_GS_Clear_Data_By_Key = Module["_GS_Clear_Data_By_Key"] = Module["asm"]["Hf"]).apply(null, arguments);
};

var _GS_Clear_All = Module["_GS_Clear_All"] = function() {
 return (_GS_Clear_All = Module["_GS_Clear_All"] = Module["asm"]["If"]).apply(null, arguments);
};

var _GS_Clear_All_By_Key = Module["_GS_Clear_All_By_Key"] = function() {
 return (_GS_Clear_All_By_Key = Module["_GS_Clear_All_By_Key"] = Module["asm"]["Jf"]).apply(null, arguments);
};

var _GS_Delete_By_Key = Module["_GS_Delete_By_Key"] = function() {
 return (_GS_Delete_By_Key = Module["_GS_Delete_By_Key"] = Module["asm"]["Kf"]).apply(null, arguments);
};

var _GS_Clear_Geometry = Module["_GS_Clear_Geometry"] = function() {
 return (_GS_Clear_Geometry = Module["_GS_Clear_Geometry"] = Module["asm"]["Lf"]).apply(null, arguments);
};

var _GS_Clear_Geometry_By_Key = Module["_GS_Clear_Geometry_By_Key"] = function() {
 return (_GS_Clear_Geometry_By_Key = Module["_GS_Clear_Geometry_By_Key"] = Module["asm"]["Mf"]).apply(null, arguments);
};

var _GS_Include_Segment_By_Key = Module["_GS_Include_Segment_By_Key"] = function() {
 return (_GS_Include_Segment_By_Key = Module["_GS_Include_Segment_By_Key"] = Module["asm"]["Nf"]).apply(null, arguments);
};

var _GS_Conditional_Include_By_Key = Module["_GS_Conditional_Include_By_Key"] = function() {
 return (_GS_Conditional_Include_By_Key = Module["_GS_Conditional_Include_By_Key"] = Module["asm"]["Of"]).apply(null, arguments);
};

var _GS_Style_Segment_By_Key = Module["_GS_Style_Segment_By_Key"] = function() {
 return (_GS_Style_Segment_By_Key = Module["_GS_Style_Segment_By_Key"] = Module["asm"]["Pf"]).apply(null, arguments);
};

var _GS_Conditional_Style_By_Key = Module["_GS_Conditional_Style_By_Key"] = function() {
 return (_GS_Conditional_Style_By_Key = Module["_GS_Conditional_Style_By_Key"] = Module["asm"]["Qf"]).apply(null, arguments);
};

var _GS_Show_Subsegment_Count = Module["_GS_Show_Subsegment_Count"] = function() {
 return (_GS_Show_Subsegment_Count = Module["_GS_Show_Subsegment_Count"] = Module["asm"]["Rf"]).apply(null, arguments);
};

var _GS_Show_Subsegment = Module["_GS_Show_Subsegment"] = function() {
 return (_GS_Show_Subsegment = Module["_GS_Show_Subsegment"] = Module["asm"]["Sf"]).apply(null, arguments);
};

var _GS_Show_All_Subsegment_Count = Module["_GS_Show_All_Subsegment_Count"] = function() {
 return (_GS_Show_All_Subsegment_Count = Module["_GS_Show_All_Subsegment_Count"] = Module["asm"]["Tf"]).apply(null, arguments);
};

var _GS_Show_Subsegment_List = Module["_GS_Show_Subsegment_List"] = function() {
 return (_GS_Show_Subsegment_List = Module["_GS_Show_Subsegment_List"] = Module["asm"]["Uf"]).apply(null, arguments);
};

var _GS_Show_All_Subsegment_List = Module["_GS_Show_All_Subsegment_List"] = function() {
 return (_GS_Show_All_Subsegment_List = Module["_GS_Show_All_Subsegment_List"] = Module["asm"]["Vf"]).apply(null, arguments);
};

var _GS_Show_Segment_Name = Module["_GS_Show_Segment_Name"] = function() {
 return (_GS_Show_Segment_Name = Module["_GS_Show_Segment_Name"] = Module["asm"]["Wf"]).apply(null, arguments);
};

var _GS_Show_Segment_Path = Module["_GS_Show_Segment_Path"] = function() {
 return (_GS_Show_Segment_Path = Module["_GS_Show_Segment_Path"] = Module["asm"]["Xf"]).apply(null, arguments);
};

var _GS_Show_Attribute_Count = Module["_GS_Show_Attribute_Count"] = function() {
 return (_GS_Show_Attribute_Count = Module["_GS_Show_Attribute_Count"] = Module["asm"]["Yf"]).apply(null, arguments);
};

var _GS_Show_Attribute_List = Module["_GS_Show_Attribute_List"] = function() {
 return (_GS_Show_Attribute_List = Module["_GS_Show_Attribute_List"] = Module["asm"]["Zf"]).apply(null, arguments);
};

var _GS_Show_Attrubute = Module["_GS_Show_Attrubute"] = function() {
 return (_GS_Show_Attrubute = Module["_GS_Show_Attrubute"] = Module["asm"]["_f"]).apply(null, arguments);
};

var _GS_Show_Geometry_Count = Module["_GS_Show_Geometry_Count"] = function() {
 return (_GS_Show_Geometry_Count = Module["_GS_Show_Geometry_Count"] = Module["asm"]["$f"]).apply(null, arguments);
};

var _GS_Show_Geometry_List = Module["_GS_Show_Geometry_List"] = function() {
 return (_GS_Show_Geometry_List = Module["_GS_Show_Geometry_List"] = Module["asm"]["ag"]).apply(null, arguments);
};

var _GS_Show_Geometry = Module["_GS_Show_Geometry"] = function() {
 return (_GS_Show_Geometry = Module["_GS_Show_Geometry"] = Module["asm"]["bg"]).apply(null, arguments);
};

var _GS_Show_Include_Count = Module["_GS_Show_Include_Count"] = function() {
 return (_GS_Show_Include_Count = Module["_GS_Show_Include_Count"] = Module["asm"]["cg"]).apply(null, arguments);
};

var _GS_Show_Include_List = Module["_GS_Show_Include_List"] = function() {
 return (_GS_Show_Include_List = Module["_GS_Show_Include_List"] = Module["asm"]["dg"]).apply(null, arguments);
};

var _GS_Show_Include = Module["_GS_Show_Include"] = function() {
 return (_GS_Show_Include = Module["_GS_Show_Include"] = Module["asm"]["eg"]).apply(null, arguments);
};

var _GS_Show_Include_Segment = Module["_GS_Show_Include_Segment"] = function() {
 return (_GS_Show_Include_Segment = Module["_GS_Show_Include_Segment"] = Module["asm"]["fg"]).apply(null, arguments);
};

var _GS_Show_Included_Count = Module["_GS_Show_Included_Count"] = function() {
 return (_GS_Show_Included_Count = Module["_GS_Show_Included_Count"] = Module["asm"]["gg"]).apply(null, arguments);
};

var _GS_Show_Included_List = Module["_GS_Show_Included_List"] = function() {
 return (_GS_Show_Included_List = Module["_GS_Show_Included_List"] = Module["asm"]["hg"]).apply(null, arguments);
};

var _GS_Show_Style_Count = Module["_GS_Show_Style_Count"] = function() {
 return (_GS_Show_Style_Count = Module["_GS_Show_Style_Count"] = Module["asm"]["ig"]).apply(null, arguments);
};

var _GS_Show_Style_List = Module["_GS_Show_Style_List"] = function() {
 return (_GS_Show_Style_List = Module["_GS_Show_Style_List"] = Module["asm"]["jg"]).apply(null, arguments);
};

var _GS_Show_Style = Module["_GS_Show_Style"] = function() {
 return (_GS_Show_Style = Module["_GS_Show_Style"] = Module["asm"]["kg"]).apply(null, arguments);
};

var _GS_Show_Style_Segment = Module["_GS_Show_Style_Segment"] = function() {
 return (_GS_Show_Style_Segment = Module["_GS_Show_Style_Segment"] = Module["asm"]["lg"]).apply(null, arguments);
};

var _GS_Show_Styled_Count = Module["_GS_Show_Styled_Count"] = function() {
 return (_GS_Show_Styled_Count = Module["_GS_Show_Styled_Count"] = Module["asm"]["mg"]).apply(null, arguments);
};

var _GS_Show_Styled_List = Module["_GS_Show_Styled_List"] = function() {
 return (_GS_Show_Styled_List = Module["_GS_Show_Styled_List"] = Module["asm"]["ng"]).apply(null, arguments);
};

var _GS_Segment_Exists = Module["_GS_Segment_Exists"] = function() {
 return (_GS_Segment_Exists = Module["_GS_Segment_Exists"] = Module["asm"]["og"]).apply(null, arguments);
};

var _GS_Rename_Segment = Module["_GS_Rename_Segment"] = function() {
 return (_GS_Rename_Segment = Module["_GS_Rename_Segment"] = Module["asm"]["pg"]).apply(null, arguments);
};

var _GS_Rename_Segment_By_Key = Module["_GS_Rename_Segment_By_Key"] = function() {
 return (_GS_Rename_Segment_By_Key = Module["_GS_Rename_Segment_By_Key"] = Module["asm"]["qg"]).apply(null, arguments);
};

var _GS_Move_Key = Module["_GS_Move_Key"] = function() {
 return (_GS_Move_Key = Module["_GS_Move_Key"] = Module["asm"]["rg"]).apply(null, arguments);
};

var _GS_Move_Key_By_Key = Module["_GS_Move_Key_By_Key"] = function() {
 return (_GS_Move_Key_By_Key = Module["_GS_Move_Key_By_Key"] = Module["asm"]["sg"]).apply(null, arguments);
};

var _GS_Set_Key_Index = Module["_GS_Set_Key_Index"] = function() {
 return (_GS_Set_Key_Index = Module["_GS_Set_Key_Index"] = Module["asm"]["tg"]).apply(null, arguments);
};

var _GS_Show_Key_Index = Module["_GS_Show_Key_Index"] = function() {
 return (_GS_Show_Key_Index = Module["_GS_Show_Key_Index"] = Module["asm"]["ug"]).apply(null, arguments);
};

var _GS_Show_Key_Tag = Module["_GS_Show_Key_Tag"] = function() {
 return (_GS_Show_Key_Tag = Module["_GS_Show_Key_Tag"] = Module["asm"]["vg"]).apply(null, arguments);
};

var _GS_Add_Property_Boolean = Module["_GS_Add_Property_Boolean"] = function() {
 return (_GS_Add_Property_Boolean = Module["_GS_Add_Property_Boolean"] = Module["asm"]["wg"]).apply(null, arguments);
};

var _GS_Add_Property_Integer = Module["_GS_Add_Property_Integer"] = function() {
 return (_GS_Add_Property_Integer = Module["_GS_Add_Property_Integer"] = Module["asm"]["xg"]).apply(null, arguments);
};

var _GS_Add_Property_Double = Module["_GS_Add_Property_Double"] = function() {
 return (_GS_Add_Property_Double = Module["_GS_Add_Property_Double"] = Module["asm"]["yg"]).apply(null, arguments);
};

var _GS_Add_Property_Double_By_Pointer = Module["_GS_Add_Property_Double_By_Pointer"] = function() {
 return (_GS_Add_Property_Double_By_Pointer = Module["_GS_Add_Property_Double_By_Pointer"] = Module["asm"]["zg"]).apply(null, arguments);
};

var _GS_Add_Property_String = Module["_GS_Add_Property_String"] = function() {
 return (_GS_Add_Property_String = Module["_GS_Add_Property_String"] = Module["asm"]["Ag"]).apply(null, arguments);
};

var _GS_Add_Property_Json = Module["_GS_Add_Property_Json"] = function() {
 return (_GS_Add_Property_Json = Module["_GS_Add_Property_Json"] = Module["asm"]["Bg"]).apply(null, arguments);
};

var _GS_Show_Property_Type = Module["_GS_Show_Property_Type"] = function() {
 return (_GS_Show_Property_Type = Module["_GS_Show_Property_Type"] = Module["asm"]["Cg"]).apply(null, arguments);
};

var _GS_Show_Property_Boolean = Module["_GS_Show_Property_Boolean"] = function() {
 return (_GS_Show_Property_Boolean = Module["_GS_Show_Property_Boolean"] = Module["asm"]["Dg"]).apply(null, arguments);
};

var _GS_Show_Property_Integer = Module["_GS_Show_Property_Integer"] = function() {
 return (_GS_Show_Property_Integer = Module["_GS_Show_Property_Integer"] = Module["asm"]["Eg"]).apply(null, arguments);
};

var _GS_Show_Property_Double = Module["_GS_Show_Property_Double"] = function() {
 return (_GS_Show_Property_Double = Module["_GS_Show_Property_Double"] = Module["asm"]["Fg"]).apply(null, arguments);
};

var _GS_Show_Property_String_Length = Module["_GS_Show_Property_String_Length"] = function() {
 return (_GS_Show_Property_String_Length = Module["_GS_Show_Property_String_Length"] = Module["asm"]["Gg"]).apply(null, arguments);
};

var _GS_Show_Property_String = Module["_GS_Show_Property_String"] = function() {
 return (_GS_Show_Property_String = Module["_GS_Show_Property_String"] = Module["asm"]["Hg"]).apply(null, arguments);
};

var _GS_Property_Exists = Module["_GS_Property_Exists"] = function() {
 return (_GS_Property_Exists = Module["_GS_Property_Exists"] = Module["asm"]["Ig"]).apply(null, arguments);
};

var _GS_Remove_Property = Module["_GS_Remove_Property"] = function() {
 return (_GS_Remove_Property = Module["_GS_Remove_Property"] = Module["asm"]["Jg"]).apply(null, arguments);
};

var _GS_Remove_Property_By_Index = Module["_GS_Remove_Property_By_Index"] = function() {
 return (_GS_Remove_Property_By_Index = Module["_GS_Remove_Property_By_Index"] = Module["asm"]["Kg"]).apply(null, arguments);
};

var _GS_Clear_Properties = Module["_GS_Clear_Properties"] = function() {
 return (_GS_Clear_Properties = Module["_GS_Clear_Properties"] = Module["asm"]["Lg"]).apply(null, arguments);
};

var _GS_Show_Property_Count = Module["_GS_Show_Property_Count"] = function() {
 return (_GS_Show_Property_Count = Module["_GS_Show_Property_Count"] = Module["asm"]["Mg"]).apply(null, arguments);
};

var _GS_Show_Property_Type_By_Index = Module["_GS_Show_Property_Type_By_Index"] = function() {
 return (_GS_Show_Property_Type_By_Index = Module["_GS_Show_Property_Type_By_Index"] = Module["asm"]["Ng"]).apply(null, arguments);
};

var _GS_Show_Property_Length_By_Index = Module["_GS_Show_Property_Length_By_Index"] = function() {
 return (_GS_Show_Property_Length_By_Index = Module["_GS_Show_Property_Length_By_Index"] = Module["asm"]["Og"]).apply(null, arguments);
};

var _GS_Show_Property_By_Index = Module["_GS_Show_Property_By_Index"] = function() {
 return (_GS_Show_Property_By_Index = Module["_GS_Show_Property_By_Index"] = Module["asm"]["Pg"]).apply(null, arguments);
};

var _GS_Show_Key_By_Id = Module["_GS_Show_Key_By_Id"] = function() {
 return (_GS_Show_Key_By_Id = Module["_GS_Show_Key_By_Id"] = Module["asm"]["Qg"]).apply(null, arguments);
};

var _GS_Show_Key_By_Name = Module["_GS_Show_Key_By_Name"] = function() {
 return (_GS_Show_Key_By_Name = Module["_GS_Show_Key_By_Name"] = Module["asm"]["Rg"]).apply(null, arguments);
};

var _GS_Open_Geometry = Module["_GS_Open_Geometry"] = function() {
 return (_GS_Open_Geometry = Module["_GS_Open_Geometry"] = Module["asm"]["Sg"]).apply(null, arguments);
};

var _GS_Close_Geometry = Module["_GS_Close_Geometry"] = function() {
 return (_GS_Close_Geometry = Module["_GS_Close_Geometry"] = Module["asm"]["Tg"]).apply(null, arguments);
};

var _GS_Compute_Path = Module["_GS_Compute_Path"] = function() {
 return (_GS_Compute_Path = Module["_GS_Compute_Path"] = Module["asm"]["Ug"]).apply(null, arguments);
};

var _GS_Compute_Coordinates_By_Key = Module["_GS_Compute_Coordinates_By_Key"] = function() {
 return (_GS_Compute_Coordinates_By_Key = Module["_GS_Compute_Coordinates_By_Key"] = Module["asm"]["Vg"]).apply(null, arguments);
};

var _GS_Compute_Coordinates_By_Path = Module["_GS_Compute_Coordinates_By_Path"] = function() {
 return (_GS_Compute_Coordinates_By_Path = Module["_GS_Compute_Coordinates_By_Path"] = Module["asm"]["Wg"]).apply(null, arguments);
};

var _GS_DCompute_Coordinates_By_Key = Module["_GS_DCompute_Coordinates_By_Key"] = function() {
 return (_GS_DCompute_Coordinates_By_Key = Module["_GS_DCompute_Coordinates_By_Key"] = Module["asm"]["Xg"]).apply(null, arguments);
};

var _GS_Compute_Boundingbox_By_Key = Module["_GS_Compute_Boundingbox_By_Key"] = function() {
 return (_GS_Compute_Boundingbox_By_Key = Module["_GS_Compute_Boundingbox_By_Key"] = Module["asm"]["Yg"]).apply(null, arguments);
};

var _GS_Compute_Boundingbox_With_Visibility_By_Key = Module["_GS_Compute_Boundingbox_With_Visibility_By_Key"] = function() {
 return (_GS_Compute_Boundingbox_With_Visibility_By_Key = Module["_GS_Compute_Boundingbox_With_Visibility_By_Key"] = Module["asm"]["Zg"]).apply(null, arguments);
};

var _GS_Compute_View_Boundingbox_By_Key = Module["_GS_Compute_View_Boundingbox_By_Key"] = function() {
 return (_GS_Compute_View_Boundingbox_By_Key = Module["_GS_Compute_View_Boundingbox_By_Key"] = Module["asm"]["_g"]).apply(null, arguments);
};

var _GS_Compute_View_Boundingbox_By_Keys = Module["_GS_Compute_View_Boundingbox_By_Keys"] = function() {
 return (_GS_Compute_View_Boundingbox_By_Keys = Module["_GS_Compute_View_Boundingbox_By_Keys"] = Module["asm"]["$g"]).apply(null, arguments);
};

var _GS_Compute_View_Boundingboxes_By_Keys = Module["_GS_Compute_View_Boundingboxes_By_Keys"] = function() {
 return (_GS_Compute_View_Boundingboxes_By_Keys = Module["_GS_Compute_View_Boundingboxes_By_Keys"] = Module["asm"]["ah"]).apply(null, arguments);
};

var _GS_Compute_Geometry_Boundingbox_By_Key = Module["_GS_Compute_Geometry_Boundingbox_By_Key"] = function() {
 return (_GS_Compute_Geometry_Boundingbox_By_Key = Module["_GS_Compute_Geometry_Boundingbox_By_Key"] = Module["asm"]["bh"]).apply(null, arguments);
};

var _GS_Compute_Segment_Boundingbox_By_Key = Module["_GS_Compute_Segment_Boundingbox_By_Key"] = function() {
 return (_GS_Compute_Segment_Boundingbox_By_Key = Module["_GS_Compute_Segment_Boundingbox_By_Key"] = Module["asm"]["ch"]).apply(null, arguments);
};

var _GS_Clear_Segment_Boundingbox_By_Key = Module["_GS_Clear_Segment_Boundingbox_By_Key"] = function() {
 return (_GS_Clear_Segment_Boundingbox_By_Key = Module["_GS_Clear_Segment_Boundingbox_By_Key"] = Module["asm"]["dh"]).apply(null, arguments);
};

var _GS_Show_BoundingBox_By_Key = Module["_GS_Show_BoundingBox_By_Key"] = function() {
 return (_GS_Show_BoundingBox_By_Key = Module["_GS_Show_BoundingBox_By_Key"] = Module["asm"]["eh"]).apply(null, arguments);
};

var _GS_Compute_Selection_By_Key = Module["_GS_Compute_Selection_By_Key"] = function() {
 return (_GS_Compute_Selection_By_Key = Module["_GS_Compute_Selection_By_Key"] = Module["asm"]["fh"]).apply(null, arguments);
};

var _GS_Compute_Selection_By_Area = Module["_GS_Compute_Selection_By_Area"] = function() {
 return (_GS_Compute_Selection_By_Area = Module["_GS_Compute_Selection_By_Area"] = Module["asm"]["gh"]).apply(null, arguments);
};

var _GS_Compute_Collision_By_Keys = Module["_GS_Compute_Collision_By_Keys"] = function() {
 return (_GS_Compute_Collision_By_Keys = Module["_GS_Compute_Collision_By_Keys"] = Module["asm"]["hh"]).apply(null, arguments);
};

var _GS_Compute_Collision_By_Key = Module["_GS_Compute_Collision_By_Key"] = function() {
 return (_GS_Compute_Collision_By_Key = Module["_GS_Compute_Collision_By_Key"] = Module["asm"]["ih"]).apply(null, arguments);
};

var _GS_Show_Selection_Count = Module["_GS_Show_Selection_Count"] = function() {
 return (_GS_Show_Selection_Count = Module["_GS_Show_Selection_Count"] = Module["asm"]["jh"]).apply(null, arguments);
};

var _GS_Show_Selection_Element = Module["_GS_Show_Selection_Element"] = function() {
 return (_GS_Show_Selection_Element = Module["_GS_Show_Selection_Element"] = Module["asm"]["kh"]).apply(null, arguments);
};

var _GS_Show_Selection_Path = Module["_GS_Show_Selection_Path"] = function() {
 return (_GS_Show_Selection_Path = Module["_GS_Show_Selection_Path"] = Module["asm"]["lh"]).apply(null, arguments);
};

var _GS_Show_Selection_Path_By_Keys = Module["_GS_Show_Selection_Path_By_Keys"] = function() {
 return (_GS_Show_Selection_Path_By_Keys = Module["_GS_Show_Selection_Path_By_Keys"] = Module["asm"]["mh"]).apply(null, arguments);
};

var _GS_Show_Selection_Position = Module["_GS_Show_Selection_Position"] = function() {
 return (_GS_Show_Selection_Position = Module["_GS_Show_Selection_Position"] = Module["asm"]["nh"]).apply(null, arguments);
};

var _GS_Show_Selection_Position_By_Value = Module["_GS_Show_Selection_Position_By_Value"] = function() {
 return (_GS_Show_Selection_Position_By_Value = Module["_GS_Show_Selection_Position_By_Value"] = Module["asm"]["oh"]).apply(null, arguments);
};

var _GS_Show_Selection_Param = Module["_GS_Show_Selection_Param"] = function() {
 return (_GS_Show_Selection_Param = Module["_GS_Show_Selection_Param"] = Module["asm"]["ph"]).apply(null, arguments);
};

var _GS_Show_Selection_Indexes = Module["_GS_Show_Selection_Indexes"] = function() {
 return (_GS_Show_Selection_Indexes = Module["_GS_Show_Selection_Indexes"] = Module["asm"]["qh"]).apply(null, arguments);
};

var _GS_Show_Selection_Test_Info = Module["_GS_Show_Selection_Test_Info"] = function() {
 return (_GS_Show_Selection_Test_Info = Module["_GS_Show_Selection_Test_Info"] = Module["asm"]["rh"]).apply(null, arguments);
};

var _GS_Show_Collision_Count = Module["_GS_Show_Collision_Count"] = function() {
 return (_GS_Show_Collision_Count = Module["_GS_Show_Collision_Count"] = Module["asm"]["sh"]).apply(null, arguments);
};

var _GS_Show_Collision_Elements = Module["_GS_Show_Collision_Elements"] = function() {
 return (_GS_Show_Collision_Elements = Module["_GS_Show_Collision_Elements"] = Module["asm"]["th"]).apply(null, arguments);
};

var _GS_Show_Collision_Paths = Module["_GS_Show_Collision_Paths"] = function() {
 return (_GS_Show_Collision_Paths = Module["_GS_Show_Collision_Paths"] = Module["asm"]["uh"]).apply(null, arguments);
};

var _GS_Show_Collision_Path_By_Keys = Module["_GS_Show_Collision_Path_By_Keys"] = function() {
 return (_GS_Show_Collision_Path_By_Keys = Module["_GS_Show_Collision_Path_By_Keys"] = Module["asm"]["vh"]).apply(null, arguments);
};

var _GS_Show_Collision_Position = Module["_GS_Show_Collision_Position"] = function() {
 return (_GS_Show_Collision_Position = Module["_GS_Show_Collision_Position"] = Module["asm"]["wh"]).apply(null, arguments);
};

var _GS_Show_Collision_Type = Module["_GS_Show_Collision_Type"] = function() {
 return (_GS_Show_Collision_Type = Module["_GS_Show_Collision_Type"] = Module["asm"]["xh"]).apply(null, arguments);
};

var _GS_Compute_Visible_By_Key = Module["_GS_Compute_Visible_By_Key"] = function() {
 return (_GS_Compute_Visible_By_Key = Module["_GS_Compute_Visible_By_Key"] = Module["asm"]["yh"]).apply(null, arguments);
};

var _GS_Compute_Ray_Test = Module["_GS_Compute_Ray_Test"] = function() {
 return (_GS_Compute_Ray_Test = Module["_GS_Compute_Ray_Test"] = Module["asm"]["zh"]).apply(null, arguments);
};

var _GS_Compute_Box_Test = Module["_GS_Compute_Box_Test"] = function() {
 return (_GS_Compute_Box_Test = Module["_GS_Compute_Box_Test"] = Module["asm"]["Ah"]).apply(null, arguments);
};

var _GS_Compute_Volume = Module["_GS_Compute_Volume"] = function() {
 return (_GS_Compute_Volume = Module["_GS_Compute_Volume"] = Module["asm"]["Bh"]).apply(null, arguments);
};

var _GS_Compute_Geometry_Distance = Module["_GS_Compute_Geometry_Distance"] = function() {
 return (_GS_Compute_Geometry_Distance = Module["_GS_Compute_Geometry_Distance"] = Module["asm"]["Ch"]).apply(null, arguments);
};

var _GS_Init_Multithreading_Services = Module["_GS_Init_Multithreading_Services"] = function() {
 return (_GS_Init_Multithreading_Services = Module["_GS_Init_Multithreading_Services"] = Module["asm"]["Dh"]).apply(null, arguments);
};

var _GS_Fina_Multithreading_Services = Module["_GS_Fina_Multithreading_Services"] = function() {
 return (_GS_Fina_Multithreading_Services = Module["_GS_Fina_Multithreading_Services"] = Module["asm"]["Eh"]).apply(null, arguments);
};

var _GS_Execute_Task_Post_Processing = Module["_GS_Execute_Task_Post_Processing"] = function() {
 return (_GS_Execute_Task_Post_Processing = Module["_GS_Execute_Task_Post_Processing"] = Module["asm"]["Fh"]).apply(null, arguments);
};

var _GS_Stream_To_Segment_By_Key_Tt = Module["_GS_Stream_To_Segment_By_Key_Tt"] = function() {
 return (_GS_Stream_To_Segment_By_Key_Tt = Module["_GS_Stream_To_Segment_By_Key_Tt"] = Module["asm"]["Gh"]).apply(null, arguments);
};

var _GS_Stream_To_Geometry_Data_By_Keys_Tt = Module["_GS_Stream_To_Geometry_Data_By_Keys_Tt"] = function() {
 return (_GS_Stream_To_Geometry_Data_By_Keys_Tt = Module["_GS_Stream_To_Geometry_Data_By_Keys_Tt"] = Module["asm"]["Hh"]).apply(null, arguments);
};

var _GS_Asyn_Update_View_By_Key_Tt = Module["_GS_Asyn_Update_View_By_Key_Tt"] = function() {
 return (_GS_Asyn_Update_View_By_Key_Tt = Module["_GS_Asyn_Update_View_By_Key_Tt"] = Module["asm"]["Ih"]).apply(null, arguments);
};

var _GS_Asyn_Update_Geometry_Data_By_Key_Tt = Module["_GS_Asyn_Update_Geometry_Data_By_Key_Tt"] = function() {
 return (_GS_Asyn_Update_Geometry_Data_By_Key_Tt = Module["_GS_Asyn_Update_Geometry_Data_By_Key_Tt"] = Module["asm"]["Jh"]).apply(null, arguments);
};

var _GS_Asyn_Buffer_Geometry_By_Key_Tt = Module["_GS_Asyn_Buffer_Geometry_By_Key_Tt"] = function() {
 return (_GS_Asyn_Buffer_Geometry_By_Key_Tt = Module["_GS_Asyn_Buffer_Geometry_By_Key_Tt"] = Module["asm"]["Kh"]).apply(null, arguments);
};

var _GS_Compute_Collision_By_Key_Tt = Module["_GS_Compute_Collision_By_Key_Tt"] = function() {
 return (_GS_Compute_Collision_By_Key_Tt = Module["_GS_Compute_Collision_By_Key_Tt"] = Module["asm"]["Lh"]).apply(null, arguments);
};

var _GS_Boolean_Intersection_Graph = Module["_GS_Boolean_Intersection_Graph"] = function() {
 return (_GS_Boolean_Intersection_Graph = Module["_GS_Boolean_Intersection_Graph"] = Module["asm"]["Mh"]).apply(null, arguments);
};

var _GS_Boolean_Intersect_Polyline_Polygon_Xy = Module["_GS_Boolean_Intersect_Polyline_Polygon_Xy"] = function() {
 return (_GS_Boolean_Intersect_Polyline_Polygon_Xy = Module["_GS_Boolean_Intersect_Polyline_Polygon_Xy"] = Module["asm"]["Nh"]).apply(null, arguments);
};

var _GS_Boolean_Intersect_Polygon_Polygon_Xy = Module["_GS_Boolean_Intersect_Polygon_Polygon_Xy"] = function() {
 return (_GS_Boolean_Intersect_Polygon_Polygon_Xy = Module["_GS_Boolean_Intersect_Polygon_Polygon_Xy"] = Module["asm"]["Oh"]).apply(null, arguments);
};

var _GS_Boolean_Intersect_Graph_Polygon_Xy = Module["_GS_Boolean_Intersect_Graph_Polygon_Xy"] = function() {
 return (_GS_Boolean_Intersect_Graph_Polygon_Xy = Module["_GS_Boolean_Intersect_Graph_Polygon_Xy"] = Module["asm"]["Ph"]).apply(null, arguments);
};

var _GS_Boolean_Subtract_Polygon_Polygon_Xy = Module["_GS_Boolean_Subtract_Polygon_Polygon_Xy"] = function() {
 return (_GS_Boolean_Subtract_Polygon_Polygon_Xy = Module["_GS_Boolean_Subtract_Polygon_Polygon_Xy"] = Module["asm"]["Qh"]).apply(null, arguments);
};

var _GS_Boolean_Cut_Polygon_Polygon_Xy = Module["_GS_Boolean_Cut_Polygon_Polygon_Xy"] = function() {
 return (_GS_Boolean_Cut_Polygon_Polygon_Xy = Module["_GS_Boolean_Cut_Polygon_Polygon_Xy"] = Module["asm"]["Rh"]).apply(null, arguments);
};

var _GS_Point_QuickSort = Module["_GS_Point_QuickSort"] = function() {
 return (_GS_Point_QuickSort = Module["_GS_Point_QuickSort"] = Module["asm"]["Sh"]).apply(null, arguments);
};

var _GS_Triangulate_Polygon = Module["_GS_Triangulate_Polygon"] = function() {
 return (_GS_Triangulate_Polygon = Module["_GS_Triangulate_Polygon"] = Module["asm"]["Th"]).apply(null, arguments);
};

var _GS_DTriangulate_Polygon = Module["_GS_DTriangulate_Polygon"] = function() {
 return (_GS_DTriangulate_Polygon = Module["_GS_DTriangulate_Polygon"] = Module["asm"]["Uh"]).apply(null, arguments);
};

var _GS_Compute_Subdivide_Curve_Count = Module["_GS_Compute_Subdivide_Curve_Count"] = function() {
 return (_GS_Compute_Subdivide_Curve_Count = Module["_GS_Compute_Subdivide_Curve_Count"] = Module["asm"]["Vh"]).apply(null, arguments);
};

var _GS_Subdivide_Curve = Module["_GS_Subdivide_Curve"] = function() {
 return (_GS_Subdivide_Curve = Module["_GS_Subdivide_Curve"] = Module["asm"]["Wh"]).apply(null, arguments);
};

var _Matrix_Det = Module["_Matrix_Det"] = function() {
 return (_Matrix_Det = Module["_Matrix_Det"] = Module["asm"]["Xh"]).apply(null, arguments);
};

var _GS_FLT_Vector_Normalize = Module["_GS_FLT_Vector_Normalize"] = function() {
 return (_GS_FLT_Vector_Normalize = Module["_GS_FLT_Vector_Normalize"] = Module["asm"]["Yh"]).apply(null, arguments);
};

var _GS_FLT_Vector_Cross = Module["_GS_FLT_Vector_Cross"] = function() {
 return (_GS_FLT_Vector_Cross = Module["_GS_FLT_Vector_Cross"] = Module["asm"]["Zh"]).apply(null, arguments);
};

var _GS_FLT_Matrix_Multiply = Module["_GS_FLT_Matrix_Multiply"] = function() {
 return (_GS_FLT_Matrix_Multiply = Module["_GS_FLT_Matrix_Multiply"] = Module["asm"]["_h"]).apply(null, arguments);
};

var _GS_FLT_Matrix_Clone = Module["_GS_FLT_Matrix_Clone"] = function() {
 return (_GS_FLT_Matrix_Clone = Module["_GS_FLT_Matrix_Clone"] = Module["asm"]["$h"]).apply(null, arguments);
};

var _GS_FLT_Matrix_Inverse = Module["_GS_FLT_Matrix_Inverse"] = function() {
 return (_GS_FLT_Matrix_Inverse = Module["_GS_FLT_Matrix_Inverse"] = Module["asm"]["ai"]).apply(null, arguments);
};

var _GS_Vector_Normalize = Module["_GS_Vector_Normalize"] = function() {
 return (_GS_Vector_Normalize = Module["_GS_Vector_Normalize"] = Module["asm"]["bi"]).apply(null, arguments);
};

var _GS_Vector_Cross = Module["_GS_Vector_Cross"] = function() {
 return (_GS_Vector_Cross = Module["_GS_Vector_Cross"] = Module["asm"]["ci"]).apply(null, arguments);
};

var _GS_Matrix_Multiply = Module["_GS_Matrix_Multiply"] = function() {
 return (_GS_Matrix_Multiply = Module["_GS_Matrix_Multiply"] = Module["asm"]["di"]).apply(null, arguments);
};

var _GS_Matrix_Clone = Module["_GS_Matrix_Clone"] = function() {
 return (_GS_Matrix_Clone = Module["_GS_Matrix_Clone"] = Module["asm"]["ei"]).apply(null, arguments);
};

var _GS_Matrix_Inverse = Module["_GS_Matrix_Inverse"] = function() {
 return (_GS_Matrix_Inverse = Module["_GS_Matrix_Inverse"] = Module["asm"]["fi"]).apply(null, arguments);
};

var _GS_FLT_Point_Add = Module["_GS_FLT_Point_Add"] = function() {
 return (_GS_FLT_Point_Add = Module["_GS_FLT_Point_Add"] = Module["asm"]["gi"]).apply(null, arguments);
};

var _GS_FLT_Point_Subtract = Module["_GS_FLT_Point_Subtract"] = function() {
 return (_GS_FLT_Point_Subtract = Module["_GS_FLT_Point_Subtract"] = Module["asm"]["hi"]).apply(null, arguments);
};

var _GS_FLT_Point_Is_Same = Module["_GS_FLT_Point_Is_Same"] = function() {
 return (_GS_FLT_Point_Is_Same = Module["_GS_FLT_Point_Is_Same"] = Module["asm"]["ii"]).apply(null, arguments);
};

var _GS_FLT_Vector_Module = Module["_GS_FLT_Vector_Module"] = function() {
 return (_GS_FLT_Vector_Module = Module["_GS_FLT_Vector_Module"] = Module["asm"]["ji"]).apply(null, arguments);
};

var _GS_FLT_Vector_Is_Zero = Module["_GS_FLT_Vector_Is_Zero"] = function() {
 return (_GS_FLT_Vector_Is_Zero = Module["_GS_FLT_Vector_Is_Zero"] = Module["asm"]["ki"]).apply(null, arguments);
};

var _GS_FLT_Vector_Include_Angle = Module["_GS_FLT_Vector_Include_Angle"] = function() {
 return (_GS_FLT_Vector_Include_Angle = Module["_GS_FLT_Vector_Include_Angle"] = Module["asm"]["li"]).apply(null, arguments);
};

var _GS_FLT_Vector_Angle = Module["_GS_FLT_Vector_Angle"] = function() {
 return (_GS_FLT_Vector_Angle = Module["_GS_FLT_Vector_Angle"] = Module["asm"]["mi"]).apply(null, arguments);
};

var _GS_FLT_Vector_Dot = Module["_GS_FLT_Vector_Dot"] = function() {
 return (_GS_FLT_Vector_Dot = Module["_GS_FLT_Vector_Dot"] = Module["asm"]["ni"]).apply(null, arguments);
};

var _GS_FLT_Vector_Angle_With_Normal = Module["_GS_FLT_Vector_Angle_With_Normal"] = function() {
 return (_GS_FLT_Vector_Angle_With_Normal = Module["_GS_FLT_Vector_Angle_With_Normal"] = Module["asm"]["oi"]).apply(null, arguments);
};

var _GS_FLT_Vector_Is_Parallel = Module["_GS_FLT_Vector_Is_Parallel"] = function() {
 return (_GS_FLT_Vector_Is_Parallel = Module["_GS_FLT_Vector_Is_Parallel"] = Module["asm"]["pi"]).apply(null, arguments);
};

var _GS_FLT_Vector_Reverse = Module["_GS_FLT_Vector_Reverse"] = function() {
 return (_GS_FLT_Vector_Reverse = Module["_GS_FLT_Vector_Reverse"] = Module["asm"]["qi"]).apply(null, arguments);
};

var _GS_FLT_Vector_Divide = Module["_GS_FLT_Vector_Divide"] = function() {
 return (_GS_FLT_Vector_Divide = Module["_GS_FLT_Vector_Divide"] = Module["asm"]["ri"]).apply(null, arguments);
};

var _GS_FLT_Vector_Is_Perpendicular = Module["_GS_FLT_Vector_Is_Perpendicular"] = function() {
 return (_GS_FLT_Vector_Is_Perpendicular = Module["_GS_FLT_Vector_Is_Perpendicular"] = Module["asm"]["si"]).apply(null, arguments);
};

var _GS_FLT_Triangle_Normal = Module["_GS_FLT_Triangle_Normal"] = function() {
 return (_GS_FLT_Triangle_Normal = Module["_GS_FLT_Triangle_Normal"] = Module["asm"]["ti"]).apply(null, arguments);
};

var _GS_FLT_Distance_Point = Module["_GS_FLT_Distance_Point"] = function() {
 return (_GS_FLT_Distance_Point = Module["_GS_FLT_Distance_Point"] = Module["asm"]["ui"]).apply(null, arguments);
};

var _GS_FLT_Distance_Point_Point = Module["_GS_FLT_Distance_Point_Point"] = function() {
 return (_GS_FLT_Distance_Point_Point = Module["_GS_FLT_Distance_Point_Point"] = Module["asm"]["vi"]).apply(null, arguments);
};

var _GS_FLT_Distance_Point_Line = Module["_GS_FLT_Distance_Point_Line"] = function() {
 return (_GS_FLT_Distance_Point_Line = Module["_GS_FLT_Distance_Point_Line"] = Module["asm"]["wi"]).apply(null, arguments);
};

var _GS_FLT_Project_Point_To_Line = Module["_GS_FLT_Project_Point_To_Line"] = function() {
 return (_GS_FLT_Project_Point_To_Line = Module["_GS_FLT_Project_Point_To_Line"] = Module["asm"]["xi"]).apply(null, arguments);
};

var _GS_FLT_Distance_Point_LineSegment = Module["_GS_FLT_Distance_Point_LineSegment"] = function() {
 return (_GS_FLT_Distance_Point_LineSegment = Module["_GS_FLT_Distance_Point_LineSegment"] = Module["asm"]["yi"]).apply(null, arguments);
};

var _GS_FLT_Distance_Line_LineSegment = Module["_GS_FLT_Distance_Line_LineSegment"] = function() {
 return (_GS_FLT_Distance_Line_LineSegment = Module["_GS_FLT_Distance_Line_LineSegment"] = Module["asm"]["zi"]).apply(null, arguments);
};

var _GS_FLT_Closest_Point = Module["_GS_FLT_Closest_Point"] = function() {
 return (_GS_FLT_Closest_Point = Module["_GS_FLT_Closest_Point"] = Module["asm"]["Ai"]).apply(null, arguments);
};

var _GS_FLT_Distance_LineSegment_LineSegment = Module["_GS_FLT_Distance_LineSegment_LineSegment"] = function() {
 return (_GS_FLT_Distance_LineSegment_LineSegment = Module["_GS_FLT_Distance_LineSegment_LineSegment"] = Module["asm"]["Bi"]).apply(null, arguments);
};

var _GS_Vector_Module = Module["_GS_Vector_Module"] = function() {
 return (_GS_Vector_Module = Module["_GS_Vector_Module"] = Module["asm"]["Ci"]).apply(null, arguments);
};

var _GS_FLT_Intersection_Line_LineSegment = Module["_GS_FLT_Intersection_Line_LineSegment"] = function() {
 return (_GS_FLT_Intersection_Line_LineSegment = Module["_GS_FLT_Intersection_Line_LineSegment"] = Module["asm"]["Di"]).apply(null, arguments);
};

var _GS_FLT_Distance_Line_Line_With_Points = Module["_GS_FLT_Distance_Line_Line_With_Points"] = function() {
 return (_GS_FLT_Distance_Line_Line_With_Points = Module["_GS_FLT_Distance_Line_Line_With_Points"] = Module["asm"]["Ei"]).apply(null, arguments);
};

var _GS_FLT_Distance_Point_Plane = Module["_GS_FLT_Distance_Point_Plane"] = function() {
 return (_GS_FLT_Distance_Point_Plane = Module["_GS_FLT_Distance_Point_Plane"] = Module["asm"]["Fi"]).apply(null, arguments);
};

var _GS_FLT_Project_Point_To_Plane = Module["_GS_FLT_Project_Point_To_Plane"] = function() {
 return (_GS_FLT_Project_Point_To_Plane = Module["_GS_FLT_Project_Point_To_Plane"] = Module["asm"]["Gi"]).apply(null, arguments);
};

var _GS_FLT_Project_Point_to_Triangle = Module["_GS_FLT_Project_Point_to_Triangle"] = function() {
 return (_GS_FLT_Project_Point_to_Triangle = Module["_GS_FLT_Project_Point_to_Triangle"] = Module["asm"]["Hi"]).apply(null, arguments);
};

var _GS_FLT_Is_Point_In_LineSegment = Module["_GS_FLT_Is_Point_In_LineSegment"] = function() {
 return (_GS_FLT_Is_Point_In_LineSegment = Module["_GS_FLT_Is_Point_In_LineSegment"] = Module["asm"]["Ii"]).apply(null, arguments);
};

var _GS_FLT_Is_Point_In_Triangle = Module["_GS_FLT_Is_Point_In_Triangle"] = function() {
 return (_GS_FLT_Is_Point_In_Triangle = Module["_GS_FLT_Is_Point_In_Triangle"] = Module["asm"]["Ji"]).apply(null, arguments);
};

var _GS_FLT_Matrix_Multiply_Point = Module["_GS_FLT_Matrix_Multiply_Point"] = function() {
 return (_GS_FLT_Matrix_Multiply_Point = Module["_GS_FLT_Matrix_Multiply_Point"] = Module["asm"]["Ki"]).apply(null, arguments);
};

var _GS_FLT_Matrix_Multiply_WPoint = Module["_GS_FLT_Matrix_Multiply_WPoint"] = function() {
 return (_GS_FLT_Matrix_Multiply_WPoint = Module["_GS_FLT_Matrix_Multiply_WPoint"] = Module["asm"]["Li"]).apply(null, arguments);
};

var _GS_FLT_Intersection_Line_Line = Module["_GS_FLT_Intersection_Line_Line"] = function() {
 return (_GS_FLT_Intersection_Line_Line = Module["_GS_FLT_Intersection_Line_Line"] = Module["asm"]["Mi"]).apply(null, arguments);
};

var _GS_FLT_Intersection_LineSegment_LineSegment = Module["_GS_FLT_Intersection_LineSegment_LineSegment"] = function() {
 return (_GS_FLT_Intersection_LineSegment_LineSegment = Module["_GS_FLT_Intersection_LineSegment_LineSegment"] = Module["asm"]["Ni"]).apply(null, arguments);
};

var _GS_FLT_Intersection_Line_Plane = Module["_GS_FLT_Intersection_Line_Plane"] = function() {
 return (_GS_FLT_Intersection_Line_Plane = Module["_GS_FLT_Intersection_Line_Plane"] = Module["asm"]["Oi"]).apply(null, arguments);
};

var _GS_FLT_Intersection_Line_Triangle = Module["_GS_FLT_Intersection_Line_Triangle"] = function() {
 return (_GS_FLT_Intersection_Line_Triangle = Module["_GS_FLT_Intersection_Line_Triangle"] = Module["asm"]["Pi"]).apply(null, arguments);
};

var _GS_FLT_Intersection_LineSegment_Triangle = Module["_GS_FLT_Intersection_LineSegment_Triangle"] = function() {
 return (_GS_FLT_Intersection_LineSegment_Triangle = Module["_GS_FLT_Intersection_LineSegment_Triangle"] = Module["asm"]["Qi"]).apply(null, arguments);
};

var _GS_FLT_Intersection_LineSegment_Triangle_With_Type = Module["_GS_FLT_Intersection_LineSegment_Triangle_With_Type"] = function() {
 return (_GS_FLT_Intersection_LineSegment_Triangle_With_Type = Module["_GS_FLT_Intersection_LineSegment_Triangle_With_Type"] = Module["asm"]["Ri"]).apply(null, arguments);
};

var _GS_FLT_Is_Intersecting_Triangle_Triangle_With_Type = Module["_GS_FLT_Is_Intersecting_Triangle_Triangle_With_Type"] = function() {
 return (_GS_FLT_Is_Intersecting_Triangle_Triangle_With_Type = Module["_GS_FLT_Is_Intersecting_Triangle_Triangle_With_Type"] = Module["asm"]["Si"]).apply(null, arguments);
};

var _GS_FLT_Intersection_Ray_Triangle = Module["_GS_FLT_Intersection_Ray_Triangle"] = function() {
 return (_GS_FLT_Intersection_Ray_Triangle = Module["_GS_FLT_Intersection_Ray_Triangle"] = Module["asm"]["Ti"]).apply(null, arguments);
};

var _GS_FLT_Is_Intersection_Ray_BBox = Module["_GS_FLT_Is_Intersection_Ray_BBox"] = function() {
 return (_GS_FLT_Is_Intersection_Ray_BBox = Module["_GS_FLT_Is_Intersection_Ray_BBox"] = Module["asm"]["Ui"]).apply(null, arguments);
};

var _GS_Point_Add = Module["_GS_Point_Add"] = function() {
 return (_GS_Point_Add = Module["_GS_Point_Add"] = Module["asm"]["Vi"]).apply(null, arguments);
};

var _GS_Point_Subtract = Module["_GS_Point_Subtract"] = function() {
 return (_GS_Point_Subtract = Module["_GS_Point_Subtract"] = Module["asm"]["Wi"]).apply(null, arguments);
};

var _GS_Point_Subtract_By_Index = Module["_GS_Point_Subtract_By_Index"] = function() {
 return (_GS_Point_Subtract_By_Index = Module["_GS_Point_Subtract_By_Index"] = Module["asm"]["Xi"]).apply(null, arguments);
};

var _GS_Vector_Is_Zero = Module["_GS_Vector_Is_Zero"] = function() {
 return (_GS_Vector_Is_Zero = Module["_GS_Vector_Is_Zero"] = Module["asm"]["Yi"]).apply(null, arguments);
};

var _GS_Vector_Multiply = Module["_GS_Vector_Multiply"] = function() {
 return (_GS_Vector_Multiply = Module["_GS_Vector_Multiply"] = Module["asm"]["Zi"]).apply(null, arguments);
};

var _GS_Vector_Dot = Module["_GS_Vector_Dot"] = function() {
 return (_GS_Vector_Dot = Module["_GS_Vector_Dot"] = Module["asm"]["_i"]).apply(null, arguments);
};

var _GS_Vector_Divide = Module["_GS_Vector_Divide"] = function() {
 return (_GS_Vector_Divide = Module["_GS_Vector_Divide"] = Module["asm"]["$i"]).apply(null, arguments);
};

var _GS_Vector_Include_Angle = Module["_GS_Vector_Include_Angle"] = function() {
 return (_GS_Vector_Include_Angle = Module["_GS_Vector_Include_Angle"] = Module["asm"]["aj"]).apply(null, arguments);
};

var _GS_Vector_Angle = Module["_GS_Vector_Angle"] = function() {
 return (_GS_Vector_Angle = Module["_GS_Vector_Angle"] = Module["asm"]["bj"]).apply(null, arguments);
};

var _GS_Vector_Angle_With_Normal = Module["_GS_Vector_Angle_With_Normal"] = function() {
 return (_GS_Vector_Angle_With_Normal = Module["_GS_Vector_Angle_With_Normal"] = Module["asm"]["cj"]).apply(null, arguments);
};

var _GS_Vector_Is_Parallel = Module["_GS_Vector_Is_Parallel"] = function() {
 return (_GS_Vector_Is_Parallel = Module["_GS_Vector_Is_Parallel"] = Module["asm"]["dj"]).apply(null, arguments);
};

var _GS_Vector_Reverse = Module["_GS_Vector_Reverse"] = function() {
 return (_GS_Vector_Reverse = Module["_GS_Vector_Reverse"] = Module["asm"]["ej"]).apply(null, arguments);
};

var _GS_Point_Is_Same = Module["_GS_Point_Is_Same"] = function() {
 return (_GS_Point_Is_Same = Module["_GS_Point_Is_Same"] = Module["asm"]["fj"]).apply(null, arguments);
};

var _GS_Point_Is_Same_By_Index = Module["_GS_Point_Is_Same_By_Index"] = function() {
 return (_GS_Point_Is_Same_By_Index = Module["_GS_Point_Is_Same_By_Index"] = Module["asm"]["gj"]).apply(null, arguments);
};

var _GS_Vector_Is_Same = Module["_GS_Vector_Is_Same"] = function() {
 return (_GS_Vector_Is_Same = Module["_GS_Vector_Is_Same"] = Module["asm"]["hj"]).apply(null, arguments);
};

var _GS_Vector_Is_Perpendicular = Module["_GS_Vector_Is_Perpendicular"] = function() {
 return (_GS_Vector_Is_Perpendicular = Module["_GS_Vector_Is_Perpendicular"] = Module["asm"]["ij"]).apply(null, arguments);
};

var _GS_Closest_Point = Module["_GS_Closest_Point"] = function() {
 return (_GS_Closest_Point = Module["_GS_Closest_Point"] = Module["asm"]["jj"]).apply(null, arguments);
};

var _GS_Distance_Point = Module["_GS_Distance_Point"] = function() {
 return (_GS_Distance_Point = Module["_GS_Distance_Point"] = Module["asm"]["kj"]).apply(null, arguments);
};

var _GS_Distance_Point_Point = Module["_GS_Distance_Point_Point"] = function() {
 return (_GS_Distance_Point_Point = Module["_GS_Distance_Point_Point"] = Module["asm"]["lj"]).apply(null, arguments);
};

var _GS_Project_Point_To_Line = Module["_GS_Project_Point_To_Line"] = function() {
 return (_GS_Project_Point_To_Line = Module["_GS_Project_Point_To_Line"] = Module["asm"]["mj"]).apply(null, arguments);
};

var _GS_Project_Point_To_LineSegment = Module["_GS_Project_Point_To_LineSegment"] = function() {
 return (_GS_Project_Point_To_LineSegment = Module["_GS_Project_Point_To_LineSegment"] = Module["asm"]["nj"]).apply(null, arguments);
};

var _GS_Project_Point_To_Plane = Module["_GS_Project_Point_To_Plane"] = function() {
 return (_GS_Project_Point_To_Plane = Module["_GS_Project_Point_To_Plane"] = Module["asm"]["oj"]).apply(null, arguments);
};

var _GS_Is_Point_In_Plane = Module["_GS_Is_Point_In_Plane"] = function() {
 return (_GS_Is_Point_In_Plane = Module["_GS_Is_Point_In_Plane"] = Module["asm"]["pj"]).apply(null, arguments);
};

var _GS_Is_Point_In_Line_Segment = Module["_GS_Is_Point_In_Line_Segment"] = function() {
 return (_GS_Is_Point_In_Line_Segment = Module["_GS_Is_Point_In_Line_Segment"] = Module["asm"]["qj"]).apply(null, arguments);
};

var _GS_Intersection_Line_LineSegment = Module["_GS_Intersection_Line_LineSegment"] = function() {
 return (_GS_Intersection_Line_LineSegment = Module["_GS_Intersection_Line_LineSegment"] = Module["asm"]["rj"]).apply(null, arguments);
};

var _GS_Intersection_LineSegment_LineSegment = Module["_GS_Intersection_LineSegment_LineSegment"] = function() {
 return (_GS_Intersection_LineSegment_LineSegment = Module["_GS_Intersection_LineSegment_LineSegment"] = Module["asm"]["sj"]).apply(null, arguments);
};

var _GS_Intersection_Line_Plane = Module["_GS_Intersection_Line_Plane"] = function() {
 return (_GS_Intersection_Line_Plane = Module["_GS_Intersection_Line_Plane"] = Module["asm"]["tj"]).apply(null, arguments);
};

var _GS_Intersection_Line_Triangle = Module["_GS_Intersection_Line_Triangle"] = function() {
 return (_GS_Intersection_Line_Triangle = Module["_GS_Intersection_Line_Triangle"] = Module["asm"]["uj"]).apply(null, arguments);
};

var _GS_Intersection_Plane_Triangle = Module["_GS_Intersection_Plane_Triangle"] = function() {
 return (_GS_Intersection_Plane_Triangle = Module["_GS_Intersection_Plane_Triangle"] = Module["asm"]["vj"]).apply(null, arguments);
};

var _GS_Intersection_Triangle_Triangle = Module["_GS_Intersection_Triangle_Triangle"] = function() {
 return (_GS_Intersection_Triangle_Triangle = Module["_GS_Intersection_Triangle_Triangle"] = Module["asm"]["wj"]).apply(null, arguments);
};

var _GS_Is_Point_On_Polygon_Xy = Module["_GS_Is_Point_On_Polygon_Xy"] = function() {
 return (_GS_Is_Point_On_Polygon_Xy = Module["_GS_Is_Point_On_Polygon_Xy"] = Module["asm"]["xj"]).apply(null, arguments);
};

var _GS_Is_Point_In_Polygon_Xy = Module["_GS_Is_Point_In_Polygon_Xy"] = function() {
 return (_GS_Is_Point_In_Polygon_Xy = Module["_GS_Is_Point_In_Polygon_Xy"] = Module["asm"]["yj"]).apply(null, arguments);
};

var _GS_Matrix_Multiply_Point = Module["_GS_Matrix_Multiply_Point"] = function() {
 return (_GS_Matrix_Multiply_Point = Module["_GS_Matrix_Multiply_Point"] = Module["asm"]["zj"]).apply(null, arguments);
};

var __emscripten_tls_init = Module["__emscripten_tls_init"] = function() {
 return (__emscripten_tls_init = Module["__emscripten_tls_init"] = Module["asm"]["Aj"]).apply(null, arguments);
};

var _pthread_self = Module["_pthread_self"] = function() {
 return (_pthread_self = Module["_pthread_self"] = Module["asm"]["Bj"]).apply(null, arguments);
};

var ___errno_location = Module["___errno_location"] = function() {
 return (___errno_location = Module["___errno_location"] = Module["asm"]["Cj"]).apply(null, arguments);
};

var __emscripten_thread_init = Module["__emscripten_thread_init"] = function() {
 return (__emscripten_thread_init = Module["__emscripten_thread_init"] = Module["asm"]["Dj"]).apply(null, arguments);
};

var __emscripten_thread_crashed = Module["__emscripten_thread_crashed"] = function() {
 return (__emscripten_thread_crashed = Module["__emscripten_thread_crashed"] = Module["asm"]["Ej"]).apply(null, arguments);
};

var _emscripten_run_in_main_runtime_thread_js = Module["_emscripten_run_in_main_runtime_thread_js"] = function() {
 return (_emscripten_run_in_main_runtime_thread_js = Module["_emscripten_run_in_main_runtime_thread_js"] = Module["asm"]["Fj"]).apply(null, arguments);
};

var _emscripten_dispatch_to_thread_ = Module["_emscripten_dispatch_to_thread_"] = function() {
 return (_emscripten_dispatch_to_thread_ = Module["_emscripten_dispatch_to_thread_"] = Module["asm"]["Gj"]).apply(null, arguments);
};

var __emscripten_proxy_execute_task_queue = Module["__emscripten_proxy_execute_task_queue"] = function() {
 return (__emscripten_proxy_execute_task_queue = Module["__emscripten_proxy_execute_task_queue"] = Module["asm"]["Hj"]).apply(null, arguments);
};

var __emscripten_thread_free_data = Module["__emscripten_thread_free_data"] = function() {
 return (__emscripten_thread_free_data = Module["__emscripten_thread_free_data"] = Module["asm"]["Ij"]).apply(null, arguments);
};

var __emscripten_thread_exit = Module["__emscripten_thread_exit"] = function() {
 return (__emscripten_thread_exit = Module["__emscripten_thread_exit"] = Module["asm"]["Jj"]).apply(null, arguments);
};

var _malloc = Module["_malloc"] = function() {
 return (_malloc = Module["_malloc"] = Module["asm"]["Kj"]).apply(null, arguments);
};

var _free = Module["_free"] = function() {
 return (_free = Module["_free"] = Module["asm"]["Lj"]).apply(null, arguments);
};

var _setThrew = Module["_setThrew"] = function() {
 return (_setThrew = Module["_setThrew"] = Module["asm"]["Mj"]).apply(null, arguments);
};

var _emscripten_stack_set_limits = Module["_emscripten_stack_set_limits"] = function() {
 return (_emscripten_stack_set_limits = Module["_emscripten_stack_set_limits"] = Module["asm"]["Nj"]).apply(null, arguments);
};

var stackSave = Module["stackSave"] = function() {
 return (stackSave = Module["stackSave"] = Module["asm"]["Oj"]).apply(null, arguments);
};

var stackRestore = Module["stackRestore"] = function() {
 return (stackRestore = Module["stackRestore"] = Module["asm"]["Pj"]).apply(null, arguments);
};

var stackAlloc = Module["stackAlloc"] = function() {
 return (stackAlloc = Module["stackAlloc"] = Module["asm"]["Qj"]).apply(null, arguments);
};

var ___start_em_js = Module["___start_em_js"] = 171516;

var ___stop_em_js = Module["___stop_em_js"] = 174636;

function invoke_viiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iii(index, a1, a2) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_v(index) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)();
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vii(index, a1, a2) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_ii(index, a1) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vi(index, a1) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1);
 } catch (e) {
  stackRestore(sp);
  if (e !== e + 0) throw e;
  _setThrew(1, 0);
 }
}

Module["keepRuntimeAlive"] = keepRuntimeAlive;

Module["wasmMemory"] = wasmMemory;

Module["allocateUTF8"] = allocateUTF8;

Module["ExitStatus"] = ExitStatus;

Module["GL"] = GL;

var calledRun;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function run(args) {
 args = args || arguments_;
 if (runDependencies > 0) {
  return;
 }
 if (ENVIRONMENT_IS_PTHREAD) {
  initRuntime();
  postMessage({
   "cmd": "loaded"
  });
  return;
 }
 preRun();
 if (runDependencies > 0) {
  return;
 }
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
}

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

run();
