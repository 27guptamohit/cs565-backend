import { type Request, type Response, type Router } from 'express';
import { type Symbols } from '../models/symbol';
import { type MeasureResponse } from '../models/response';
// import { type Measure } from '../models/measure';

// import SheetModel from '../models/sheet';
import MeasureModel from '../models/measure';
// import MeasureResponseModel from '../models/response';
// import SymbolModel from '../models/symbol';

const nameMap: Record<string, string> = {
  quater_note: '4',
  half_note: '2',
  whole_note: '1',
  quater_rest: 'r4',
  half_rest: 'r2',
  whole_rest: 'r1'
};

const pitchMap: Record<string, string> = {
  1: 'e',
  2: 'f',
  3: 'g',
  4: 'a',
  5: 'b',
  6: 'c\'',
  7: 'd\'',
  8: 'e\'',
  9: 'f\''
};

const header = `
\\include "english.ly"


\\paper {
  paper-height = 4.6\\in
  paper-width = 8.5\\in
  indent = #0
  system-count = #2
}

\\score {
  \\fixed c' {

`;

const footer = `
  }
}
`;

// Responses: [user_id, [symbol1, symbol2, symbol3]]
// Symbols: [name, pitch]

const lilypondRoute = (router: Router): Router => {
  router.get('/lilypond:id', async (req: Request, res: Response) => {
    try {
      const measureList = await MeasureModel.findOne({ sheetId: req.params.id }).sort({ measureId: 1 });

      let sheet = '';
      sheet += header;

      measureList?.responses.forEach((measureResponse: MeasureResponse) => {
        let seg = '';
        const symbolList = measureResponse.symbols;
        symbolList.forEach((symbol: Symbols) => {
          let exp = '';
          const symbolName = symbol.name;
          const symbolPitch = symbol.pitch;
          const type = symbolName.split('_')[1];

          if (type === 'note') {
            // pitch + duration
            exp = pitchMap[symbolPitch] + nameMap[symbolName];
          } else if (type === 'rest') {
            exp = nameMap[symbolName];
          }
          seg = seg + exp + ' ';
        });
        sheet = sheet + seg + '\n';
      });
      sheet += footer;
      //   }

      return res.status(201).json({ message: 'Sheet GET successful', data: sheet });
    } catch (error) {
      return res.status(500).json({ message: 'Sheet GET failed - something went wrong on the server', data: error });
    }
  });

  return router;
};

export default lilypondRoute;
