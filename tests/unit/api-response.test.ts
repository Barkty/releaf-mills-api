import { expect } from 'chai';
import sinon from 'sinon';
import { error, success } from '../../src/shared/response';
import { describe } from 'mocha';

describe('Response Handlers', () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    };
  });

  describe('error', () => {
    it('should send an error response with the correct structure', () => {
      const err: any = { message: 'Something went wrong' };
      const code = 500;

      error(res, err, code);

      expect(res.status.calledWith(code)).to.be.false;
      expect(res.json.calledWith({
        status: 'error',
        code: code,
        data: undefined,
        message: err.message
      })).to.be.false;
    });
  });

  describe('success', () => {
    it('should send a success response with the correct structure', () => {
      const message = 'Operation successful';
      const code = 200;
      const data = { key: 'value' };

      success(res, code, message, data);

      expect(res.status.calledWith(code)).to.be.true;
      expect(res.json.calledWith({
        status: 'success',
        message: message,
        code: code,
        data: data
      })).to.be.true;
    });

    it('should send a success response without data when data is not provided', () => {
      const message = 'Operation successful';
      const code = 200;

      success(res, code, message);

      expect(res.status.calledWith(code)).to.be.true;
      expect(res.json.calledWith({
        status: 'success',
        message: message,
        code: code,
        data: undefined
      })).to.be.true;
    });
  });
});
