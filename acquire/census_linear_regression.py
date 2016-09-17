import csv
import requests

__author__ = 'James Zhu'

census_variables = ['EarnS']

industries = ['11', '21', '22', '23', '31-33', '42', '44-45', '48-49', '51', '52', '53', '54', '55', '56', '61', '62', '71', '72', '81', '92']

params = {
    'get': ','.join(census_variables),
    'for': 'county:*',
    'in': 'state:',
    'time': 'from 2010-Q1 to 2015-Q4',
    'key': '48aa9bfa96368c16ae41c84305b48ea26d206f48',
    'sex': '1',
    'industry': '',
}

all_data = []

# for state in range(1, 57):
for ind in industries:
    for sex in [1, 2]:
        for state in range(1, 5):
            if state not in [3, 7, 14, 43, 52]:
                params['in'] = 'state:' + str(state).zfill(2)
                params['sex'] = str(sex)
                params['industry'] = str(ind)
                print("---")
                print("Requesting state", state)
                print(params)
                try:
                    data = requests.get("http://api.census.gov/data/timeseries/qwi/se", params=params, timeout=1)
                    print("Got response", data.status_code)
                    data.raise_for_status()
                    all_data.append(data.json())
                except:
                    pass

# Write to CSV
with open('data.json', 'w') as file:
    for state in all_data:
        file.write(str(state))
        file.write('\n')

# xi = array(hh_size)
# y = array(income)
#
# # Calculate linear regression
#
# A = array([xi, ones(len(xi))])
# w = linalg.lstsq(A.T,y)[0]
#
# # Plot linear regression
#
# line = w[0]*xi+w[1]
# plot(xi, line,'r-',xi,y,'o')
# show()
