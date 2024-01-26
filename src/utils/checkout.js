const checkout = {
  "170": ['T20  -  T20  -  D25'],
  "169": ['---No checkout--- ', 'Suggestion:', 'T19 - T20 - S12 leaves 40', 'T19 - T19 - S19 leaves 36'],
  "168": ['---No checkout--- ', 'Suggestion:', 'T20 - T20 leaves 48, then pick S8 or S16'],
  "167": ['T20  -  T19  -  D25'],
  "166": ['---No checkout--- ', 'Suggestion:', 'T20 - T20 - S6 leaves 40', 'S20 - T19 - T19 leaves 32'],
  "165": ['---No checkout--- ', 'Suggestion:', 'T20 - T19  -  S8 leaves 40', 'T20 - S20 - T15 leaves 40', 'T20 - T20 - S13 leaves 32'],
  "164": ['T20 - T18 - D25', 'T19 - T19 - D25'],
  "163": [' ---No checkout --- ', 'Suggestion:', 'T20 - T19 - S6 leaves 40', 'T20 - T17 - S20 leaves 32'],
  "162": [' ---No checkout --- ', 'Suggestion:', 'T20 - T20 - S10 leaves 32', 'S20 - T20 - T14 leaves 40'],
  "161": ['T20  -  T17  -  D25', 'T19  -  T18  -  D25'],
  "160": ['T20  -  T20  -  D20'],
  "159": ['---No checkout--- ', 'Suggestion:', 'T19 - T20 - S10 leaves 32'],
  "158": ['T20  -  T20  -  D19', 'T18  -  T18  -  D25'],
  "157": ['T20  -  T19  -  D20'],
  "156": ['T20  -  T20  -  D18'],
  "155": ['T20  -  T19  -  D19'],
  "154": ['T20  -  T18  -  D20', 'T19  -  T19  -  D20', 'T20  -  T20  -  D17'],
  "153": ['T20  -  T19  -  D18'],
  "152": ['T20  -  T20  -  D16'],
  "151": ['T20  -  T17  -  D20', 'T19  -  T18  -  D20'],
  "150": ['T20  -  T18  -  D18', 'T19  -  T19  -  D18','T20  -  T20  -  D15'],
  "149": ['T20  -  T19  -  D16'],
  "148": ['T20  -  T16  -  D20', 'T18  -  T18  -  D20', 'T19  -  T17  -  D20', 'T20  -  T20  -  D14'],
  "147": ['T20  -  T17  -  D18', 'T19  -  T18  -  D18'],
  "146": ['T20  -  T18  -  D16', 'T19  -  T19  -  D16'],
  "145": ['T20  -  T15  -  D20', 'T20  -  T19  -  D14'],
  "144": ['T20  -  T20  -  D12', 'T18  -  T18  -  D18'],
  "143": ['T20  -  T17  -  D16', 'T19  -  T18  -  D16'],
  "142": ['T20  -  T14  -  D20', 'T19  -  T15  -  D20', 'T17  -  T17  -  D20'],
  "141": ['T20 - T19 - D12', 'T20 - T15  -  D18', 'T19  -  T16  -  D18', 'T17  -  T18  -  D18'],
  "140": ['T20 - T20 - D10', 'T20 - D20 - D20', 'T18 - T18 - D16'],
  "139": ['T19 - T14 - D20', 'T20 - T13 - D20', 'T19 - D25 - D16'],
  "138": ['T20 - T18 - D12', 'T19 - T19 - D12', 'T19 - T15 - D18'],
  "137": ['T20 - T19 - D10', 'T20 - T15 - D16'],
  "136": ['T20 - T20 - D8', 'T20 - D18 - D20', 'T20 - T16 - D14'],
  "135": ['D25 - T15 - D20', 'T20 - T17 - D12'],
  "134": ['T20 - T14 - D16', 'T17 - T17 - D16', 'T20 - T16 - D13'],
  "133": ['T20 - T19 - D8', 'T20 - T15 - D14'],
  "132": ['T20 - T16 - D12', 'D25 - T14 - D20', 'D25 - D25 - D16'],
  "131": ['T19 - T14 - D16', 'T20 - T13 - D16', 'T17 - D20 - D20'],
  "130": ['T20 - T18 - D8', 'T20 - T20 - D5'],
  "129": ['T19 - T16 - D12', 'T19 - T12 - D18', 'T20 - T19 - D6', 'T20 - S19 - D25'],
  "128": ['T18 - T14 - D16', 'T18 - T18 - D10', 'T20 - S18 - D25'],
  "127": ['T20 - T17 - D8', 'T19 - S20 - D25', 'T20 - S17 - D25'],
  "126": ['T19 - T19 - D6', 'T19 - S19 - D25'],
  "125": ['T18 - T13 - D16', 'T15 - D20 - D20', 'T20 - S25 - D20'],
  "124": ['T20 - D16 - D16', 'T20 - T14 - D11'],
  "123": ['T19 - T16 - D9', 'S19 - T18 - D25'],
  "122": ['T18 - T18 - D7', 'D25 - T16 - D12'],
  "121": ['T20 - T11 - D14', 'T17 - T20 - D5', 'S20 - T17 - D25', 'S17 - T18 - D25'],
  "120": ['T20 - S20 - D20', 'S20 - D25 - D25'],
  "119": ['T19 - T12 - D13', 'T20 - S19 - D20'],
  "118": ['T20 - S18 - D20', 'T17 - T17 - D8', 'S17 - T17 - D25'],
  "117": ['T20 - S17 - D20', 'T19 - S20 - D20'],
  "116": ['T20 - S16 - D20', 'S20 - T20 - D18'],
  "115": ['T19 - S18 - D20', 'T20 - S15 - D20', 'S20 - T19 - D19'],
  "114": ['T20 - S14 - D20', 'T19 - S17 - D20'],
  "113": ['T19 - S16 - D20', 'T20 - S13 - D20'],
  "112": ['T20 - S12 - D20', 'T20 - S20 - D16', 'T19 - S19 - D18', 'T18 - S18 - D20'],
  "111": ['T19 - S14 - D20', 'T20 - S11 - D20', 'S20 - T17 - D20'],
  "110": ['T20 - D25', 'T20 - S10 - D20', 'T20 - S18 - D16'],
  "109": ['T20 - S9 - D20', 'T20 - S17 - D16'],
  "108": ['T20 - S8 - D20', 'T20 - S16 - D16', 'T19 - S19 - D16', 'T18 - S14 - D20', 'T18 - S18 - D18', 'T17 - S17 - D20'],
  "107": ['T19 - D25', 'T20 - S6 - D20', 'T20 - S10 - D18'],
  "106": ['T20 - S6 - D20', 'T20 - S10 - D18'],
  "105": ['T19 - S8 - D20', 'T19 - S16 - D16', 'T20 - S13 - D16', 'T20 - S5 - D20'],
  "104": ['T18 - D25', 'T16 - S16 - D20', 'T19 - S15 - D16', 'T18 - S10 - D20'],
  "103": ['T19 - S6 - D20', 'T19 - S10 - D18', 'T17 - S12 - D20'],
  "102": ['T16 - S14 - D20', 'T20 - S10 - D16', 'T20 - S6 - D18'],
  "101": ["T17 - D25", 'T20 - S9 - D16', 'T20 - S1 - D20', 'T19 - S12 - D16'],
  "100": ['T20 - D20'],
  "99": ['T19 - S10 - D16', 'T17 - S16 - D16'],
  "98": ['T20 - D19'],
  "97": ['T19 - D20'],
  "96": ['T20 - D18'],
  "95": ['T19 - D19'],
  "94": ['T18 - D20'],
  "93": ['T19 - D18'],
  "92": ['T20 - D16'],
  "91": ['T17 - D20'],
  "90": ['T20 - D15', 'T18 - D18'],
  "89": ['T19 - D16'],
  "88": ['T20 - D14', 'T16 - D20'],
  "87": ['T17 - D18'],
  "86": ['T18 - D16'],
  "85": ['T15 - D20', 'T19 - D14'],
  "84": ['T20 - D12', 'T16 - D18'],
  "83": ['T17 - D16'],
  "82": ['T14 - D20', 'D25 - D16'],
  "81": ['T19 - D12', 'T15 - D18'],
  "80": ['T20 - D10', 'D20 - D20'],
  "79": ['T19 - D11', 'T13 - D20'],
  "78": ['T18 - D12'],
  "77": ['T19 - D10', 'T15 - D16'],
  "76": ['T16 - D14', 'T20 - D8', 'D18 - D20'],
  "75": ['T17 - D12', 'T13 - D18', 'S25 - D25'],
  "74": ['T14 - D16', 'T16 - D13', 'T18 - D10'],
  "73": ['T19 - D8', 'T15 - D14', 'T11 - D20'],
  "72": ['T16 - D12', 'T12 - D18', 'T20 - D6'],
  "71": ['T13 - D16', 'T17 - D10', 'T19 - D7', 'T13 - D16'],
  "70": ['T18 - D8', 'T10 - D20', 'T20 - D5', 'S20 - D25'],
  "69": ['T15 - D12', 'T19 - D6', 'S19 - D25'],
  '68': ['T12 - D16', 'T16 - D10', 'T20 - D4', 'T18 - D7'],
  "67": ['T9 - D20', 'T17 - D8'],
  "66": ['T10 - D18', 'T18 - D6', 'T14 - D12', 'T16 - D9'],
  "65": ['T11 - D16', 'T15 - D10', 'T19 - D4', 'S25 - D20'],
  "64": ['T16 - D8', 'T8 - D20', 'S16 - S16 - D16', 'D16 - D16'],
  "63": ['T13 - D12', 'T17 - D6'],
  "62": ['T10 - D16', 'T14 - D10', 'T18 - D4'],
  "61": ['S25 - D18', 'T7 - D20', 'T15 - D8', 'T11 - D14'],
  "60": ['S20 - D20'],
  "59": ['S19 - D20'],
  "58": ['S18 - D20'],
  "57": ['S17 - D20'],
  "56": ['S16 - D20', 'T16 - D4'],
  "55": ['S15 - D20'],
  "54": ['S14 - D20'],
  "53": ['S13 - D20', 'S17 - D18'],
  "52": ['S12 - D20', 'S20 - D16', 'T12 - D8'],
  "51": ['S11 - D20', 'S19 - D16', 'S15 - D18'],
  "50": ['D25', 'S10 - D20', 'S18 - D16', 'T10 - D10'],
  "49": ['S9 - D20', 'S17 - D16'],
  "48": ['S8 - D20', 'S16 - D16'],
  "47": ['S15 - D16', 'S7 - D20'],
  "46": ['S6 - D20', 'S14 - D16', 'S10 - D18'],
  "45": ['S13 - D16', 'S5 - D20'],
  "44": ['S12 - D16', 'S4 - D20'],
  "43": ['S11 - D16', 'S3 - D20'],
  "42": ['S10 - D16', 'S6 - D18'],
  "41": ['S9 - D16', 'S1 - D20'],
  "40": ['D20'],
  "39": ['S7 - D16', 'S19 - D10'],
  "38": ['D19'],
  "37": ['S5 - D16'],
  "36": ['D18'],
  "35": ['S3 - D16'],
  "34": ['D17'],
  "33": ['S1 - D16', 'S17 - D8'],
  "32": ['D16'],
  "31": ['S15 - D8', 'S7 - D12'],
  "30": ['D15'],
  "29": ['S13 - D8', 'S5 - D12'],
  "28": ['D14'],
  "27": ['S19 - D4', 'S7 - D10', 'S9 - D8'],
  "26": ['D13'],
  "25": ['S9 - D8'],
  "24": ['D12'],
  "23": ['S7 - D8'],
  "22": ['D11'],
  "21": ['S13 - D4', 'S5 - D8'],
  "20": ['D10'],
  "19": ['S11 - D4', 'S3 - D8'],
  "18": ['D9'],
  "17": ['S9 - D4', 'S1 - D8'],
  "16": ['D8'],
  "15": ['S7 - D4'],
  "14": ['D7'],
  "13": ['S5 - D4'],
  "12": ['D6'],
  "11": ['S3 - D4'],
  "10": ['D5'],
  "9": ['S1 - D4'],
  "8": ['D4'],
  "7": ['S3 - D2'],
  "6": ['D3'],
  "5": ['S1 - D2'],
  "4": ['D2'],
  "3": ['S1 - D1'],
  "2": ['D1']
}

export default checkout;