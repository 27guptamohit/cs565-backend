import json
import sys
import collections

name_map = {
    "quarter_note": "4",
    "half_note": "2",
    "whole_note": "1",
    "quater_rest": "r4",
    "half_rest": "r2",
    "whole_rest": "r1"
}

pitch_map = {
    1: 'e',
    2: 'f',
    3: 'g',
    4: 'a',
    5: 'b',
    6: "c'",
    7: "d'",
    8: "e'",
    9: "f'"
}

header = """
\\version "2.24"

\include "english.ly"

\paper {
  paper-height = 4.6\in
  paper-width = 8.5\in
  indent = #0
  system-count = #2
}

\score {
  \\fixed c' {

"""

footer = """
  }
}
"""


if __name__ == '__main__':
    # file_name = sys.argv[1]
    file_name = 'scripts/sample.json'

    with open(file_name, 'r') as f:
    # Load the JSON data
        data = json.load(f)
        # measure = {key: data[key] for key in sorted_keys}
        # Sort the JSON data by 'measureNum' in ascending order
        sorted_data = sorted(data, key=lambda x: x['measureNum'])

        # Create a dictionary to store the sorted data
        sorted_dict = {}

        # Iterate through the sorted data and populate the dictionary
        for item in sorted_data:
            measure_num = item['measureNum']
            responses = item['responses']
            sorted_dict[measure_num] = responses

        # print(sorted_dict)



        most_common_dict = {}

        # Iterate through the sorted_dict
        for measure_num, responses in sorted_dict.items():
            # Concatenate name and pitch for each response
            symbol_strings = []
            for response in responses:
                symbols = response['symbols']
                symbol_string = "".join([symbol['name'] + str(symbol.get('pitch', '')) for symbol in symbols])
                symbol_strings.append(symbol_string)
            
            # Count occurrences of each symbol string
            counter = collections.Counter(symbol_strings)
            
            # Get the most common symbol string
            most_common_symbol_string = counter.most_common(1)[0][0]
            
            # Create a list for the most common symbols
            most_common_symbols = []
            visted_symbols = []
            for response in responses:
                symbols = response['symbols']
                symbol_string = "".join([symbol['name'] + str(symbol.get('pitch', '')) for symbol in symbols])
                if symbol_string == most_common_symbol_string and symbol_string not in visted_symbols:
                    most_common_symbols.extend(symbols)
                    visted_symbols.append(symbol_string)
            
            # Add the most common symbols to the most_common_dict
            most_common_dict[measure_num] = most_common_symbols
            # print(most_common_symbols)

        print(most_common_dict)

        sheet = header

        # Iterate through the most_common_dict
        for measure_num, symbols in most_common_dict.items():
            print("Measure ID:", measure_num)
            # Iterate through the symbols list for each measure ID
            seg = "    "
            for symbol in symbols:
                symbol_name = symbol['name']
                symbol_pitch = symbol['pitch']
                print("Symbol Name:", symbol['name'])
                print("Symbol Pitch:", symbol.get('pitch', None))

                exp = ""
                if (symbol_name.split('_')[1] == "note"):
                    exp = pitch_map[symbol_pitch] + name_map[symbol_name]
                else:
                    exp = name_map[symbol_name]
                
                seg = seg + exp + " "

            sheet = sheet + seg + "\n"

        sheet += footer

        print(sheet)
        






        # with userId 
        # most_common_dict = {}

        # # Iterate through the sorted_dict
        # for measure_num, responses in sorted_dict.items():
        #     # Concatenate name and pitch for each response
        #     symbol_strings = []
        #     for response in responses:
        #         symbols = response['symbols']
        #         symbol_string = "".join([symbol['name'] + str(symbol.get('pitch', '')) for symbol in symbols])
        #         symbol_strings.append(symbol_string)
            
        #     # Count occurrences of each symbol string
        #     counter = collections.Counter(symbol_strings)
            
        #     # Get the most common symbol string
        #     most_common_symbol_string = counter.most_common(1)[0][0]
            
        #     # Create a dictionary for the most common response
        #     most_common_response = {}
        #     for response in responses:
        #         symbols = response['symbols']
        #         symbol_string = "".join([symbol['name'] + str(symbol.get('pitch', '')) for symbol in symbols])
        #         if symbol_string == most_common_symbol_string:
        #             most_common_response['userId'] = response['userId']
        #             most_common_response['symbols'] = symbols
            
        #     # Add the most common response to the most_common_dict
        #     most_common_dict[measure_num] = most_common_response

        # print(most_common_dict)





        # # Create a dictionary to store the most common response for each measureNum
        # most_common_responses = {}

        # # Iterate through the sorted_dict
        # for measure_num, responses in sorted_dict.items():
        #     # Create a Counter object to count the occurrences of each response
        #     counter = collections.Counter()
        #     for response in responses:
        #         symbols = tuple(sorted(response['symbols'], key=lambda x: x.get('pitch', None)))
        #         counter[symbols] += 1
            
        #     # Get the most common response
        #     most_common_response = counter.most_common(1)[0][0]
            
        #     # Add the most common response to the dictionary
        #     most_common_responses[measure_num] = {
        #         'symbols': most_common_response,
        #         'count': counter[most_common_response]
        #     }

        # # Print the most common responses for each measureNum
        # for measure_num, response in most_common_responses.items():
        #     print(f"Measure ID: {measure_num}")
        #     print(f"Most Common Symbols: {response['symbols']}")
        #     print(f"Count: {response['count']}")
        

    # print(measure)
    # print(data)
