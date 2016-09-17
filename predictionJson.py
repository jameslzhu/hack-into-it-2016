import csv
import json
import os
import numpy as np
from scipy import stats

for filename in os.listdir('formattedData/'):

    print(filename)

    csvfile = open('formattedData/' + filename, 'r')

    d = {}

    fieldnames = ('geography', 'industry', 'sex', 'year', 'quarter', 'Emp', 'HirN', 'EarnS')
    reader = csv.DictReader(csvfile, fieldnames)
    for row in reader:
        if row['geography'] == 'geography':
            continue
        geo = row['geography']
        if geo not in d.keys():
            d[geo] = {}
        tempd = d[geo]
        ind = row['industry']
        if ind not in tempd.keys():
            tempd[ind] = {}
        tempd = tempd[ind]
        sex = row['sex']
        if sex not in tempd.keys():
            tempd[sex] = ['', '', '', '', '', '', '', '', '', '']
        year = int(row['year'])
        quarter = int(row['quarter'])
        index = (year - 2011) * 2 + quarter // 2
        emp, hirn, earn = row['Emp'], row['HirN'], row['EarnS']
        lst = [int(emp) if emp else -1, int(hirn) if hirn else -1, int(earn) if earn else -1]
        tempd[sex][index] = lst

        if '' not in tempd['1'] and '' not in tempd['2']:
            for sex in ('1', '2'):
                gender = tempd[sex]
                emp, hirn, earn = [], [], []
                a = [emp, hirn, earn]
                for i in range(5):
                    for j in range(3):
                        if -1 == gender[i*2][j]:
                            a[j].append(gender[i*2+1][j])
                        elif -1 == gender[i*2+1][j]:
                            a[j].append(gender[i*2+1][j])
                        else:
                            a[j].append((gender[i*2][j] + gender[i*2+1][j]) / 2)

                results = []

                for j in range(3):
                    latest = -1
                    xlst = []
                    ylst = []
                    for x in range(5):
                        if a[j][x] != -1:
                            xlst.append(x)
                            latest = a[j][x]
                            ylst.append(latest)
                    if len(xlst) != 0:
                        if len(xlst) >= 2:
                            if len(xlst) == 2:
                                xlst.append((xlst[0] + xlst[1]) / 2)
                                ylst.append((ylst[0] + ylst[1]) / 2)
                            slope, intercept, _, _, _ = stats.linregress(xlst, ylst)
                            results.append(slope*6 + intercept)
                            results.append(latest)
                        elif len (xlst) == 1:
                            results.append(latest)
                            results.append(latest)

                    else:
                        results.append(-1)
                        results.append(-1)
                tempd[sex] = {}
                k = ('EmpPred', 'EmpL', 'HirNPred', 'HirNL', 'EarnSPred', 'EarnSL')
                for i in range(6):
                    tempd[sex][k[i]] = max(results[i], 0)
            m = tempd['1']['EmpPred']
            f = tempd['2']['EmpPred']
            if m != -1 and f != -1:
                if m == 0 and f == 0:
                    mfratioPred = 0
                else:
                    mfratioPred = m / (m + f)
                m = tempd['1']['EmpL']
                f = tempd['2']['EmpL']
                if m == 0 and f == 0:
                    mfratioL = 0
                else:
                    mfratioL = m / (m + f)
                tempd['1']['RatioPred'] = mfratioPred
                tempd['1']['RatioL'] = mfratioL
                tempd['2']['RatioPred'] = 1 - mfratioPred
                tempd['2']['RatioL'] = 1 - mfratioL

                    
    jsonfile = open('jsonPredict/' + filename[:-3] + 'json', 'w')

    json.dump(d, jsonfile, sort_keys = True, indent = 4)

    csvfile.close()
    jsonfile.close()
