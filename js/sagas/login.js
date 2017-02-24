/**
 * Microsoft Mobile Center App
 *
 * Copyright (c) Microsoft Corporation
 *
 * All rights reserved.
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software. THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF
 * ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
 * THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

import {  } from 'redux-saga';
import { takeEvery, call, put, fork } from 'redux-saga/effects';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/types';

import { loginAPI } from '../utils/RequestUtil';

export function* watchRequestLogin() {
  yield takeEvery(LOGIN_REQUEST, loginFlow);
}

export function* loginFlow(action) {
  yield fork(authorize,
        {username: action.username, password: action.password });
}

export function* authorize({username, password}) {
  try {
    const response = yield call(loginAPI, {
      username,
      password
    });
    yield put({
      type: LOGIN_SUCCESS,
      response
    });
  } catch (error) {
    yield put({
      type: LOGIN_ERROR,
      error
    });
  }
}