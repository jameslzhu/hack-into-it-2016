import json
import os
from math import log10

PW = 1
LW = 0

def job_formula(income, hiring, employed):
    if income == 0 or hiring == 0 or employed == 0:
        return 0
    return log10(income)**2 + ((hiring/employed)**.5) * log10(hiring)**2 * log10(employed)

def otp_formula_straight(ratio, total_emp):
    if total_emp == 0:
        return 0
    return 10 * (1 - ratio)**2 * log10(total_emp)**2

def otp_formula_gay(ratio, total_emp):
    if total_emp == 0:
        return 0
    return 10 * ratio**2 * log10(total_emp)**2

for filename in os.listdir('jsonPredict/'):
    print(filename)

    with open('jsonPredict/' + filename) as data_file:
        data = json.load(data_file)

        for c in data.keys():
            county = data[c]
            for i in county.keys():
                ind = county[i]
                if type(ind['1']) != list and type(ind['2']) != list:
                    if ind['1']['EmpL'] and ind['2']['EmpL']:
                        l = ind['1']['EmpL'] + ind['2']['EmpL']
                        p = ind['1']['EmpPred'] + ind['2']['EmpPred']
                        total_emp = l * LW + p * PW
                    else:
                        continue
                for g in ind.keys():
                    gender = ind[g]
                    if type(gender) == list:
                        continue
                    if gender['EarnSL'] and gender['EmpL'] and gender['HirNL'] and gender['RatioL']:
                        inc = gender['EarnSL'] * LW + gender['EarnSPred'] * PW
                        hir = gender['HirNL'] * LW + gender['HirNPred'] * PW
                        emp = gender['EmpL'] * LW + gender['EmpPred'] * PW
                        rat = gender['RatioL'] * LW + gender['RatioPred'] * PW
                        job = job_formula(inc, hir, emp)
                        straight = otp_formula_straight(rat, total_emp)
                        gay = otp_formula_gay(rat, total_emp)
                        gender['IncScore'] = job
                        gender['straightScore'] = straight
                        gender['gayScore'] = gay

    data_file.close()
    newjson = open('jsonWithRating/' + filename, 'w')
    json.dump(data, newjson, sort_keys = True, indent = 4)

    newjson.close()
