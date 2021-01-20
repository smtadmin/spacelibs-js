/*
 * Filename: HTTPMethod.js
 * Created Date: Tuesday, January 12th 2021, 2:45:54 pm
 * Author: Tyler Gaffaney
 * Description: This enum contains all possible HTTP Method types
 * Copyright (c) 2021 Silicon Mountain Technologies
 */

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const PATCH = 'PATCH';
const HEAD = 'HEAD';
const TRACE = 'TRACE';
const OPTIONS = 'OPTIONS';
const CONNECT = 'CONNECT';

const HTTPMethod = {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
  HEAD,
  TRACE,
  OPTIONS,
  CONNECT,
};

export default HTTPMethod;