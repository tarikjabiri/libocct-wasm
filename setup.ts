import {
	execSync,
	type ExecSyncOptionsWithStringEncoding,
} from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { rimrafSync } from "rimraf";

const EMSDK_URL = "https://github.com/emscripten-core/emsdk.git";
const EMSDK_DIR = resolve("./build/emsdk");
const EMSDK_TAG = "3.1.71";

const OCCT_URL = "https://github.com/Open-Cascade-SAS/OCCT.git";
const OCCT_DIR = resolve("./build/occt");
const OCCT_TAG = "V7_8_1";

if (existsSync(OCCT_DIR)) rimrafSync(OCCT_DIR);
if (existsSync(EMSDK_DIR)) rimrafSync(EMSDK_DIR);

const GIT_CMD = "git -c advice.detachedHead=false clone --depth=1 -b";

const options: ExecSyncOptionsWithStringEncoding = {
	encoding: "utf-8",
};

execSync(`${GIT_CMD} ${EMSDK_TAG} ${EMSDK_URL} ${EMSDK_DIR}`, options);
execSync(`${EMSDK_DIR}/emsdk install latest`, options);
execSync(`${EMSDK_DIR}/emsdk activate --embedded latest`, options);
execSync(`cd ${EMSDK_DIR}/upstream/emscripten && npm install`, options);
execSync(`${GIT_CMD} ${OCCT_TAG} ${OCCT_URL} ${OCCT_DIR}`, options);
