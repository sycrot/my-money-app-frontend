import axios from 'axios'
const BASE_URL = 'http://localhost:3003/api'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const INITIAL_VALUES = {credits: [{}], debts: [{}]}

export function getList( ) {
    const req = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: req
    }
}

export function create(values) {
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
        .then(resp => {
            toastr.success('Sucesso', 'Operacao realizada com sucesso')
            dispatch(init())
        })
        .catch(e => {
            const errors = Object.values(e.response.data.errors)
            
            errors.forEach(error => toastr.error('Erro', error.message))
        })
    }
}

function showTab(tab, billingCycle) {
    return [
        showTabs(tab),
        selectTab(tab),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function showUpdate(billingCycle) {
    return showTab('tabUpdate', billingCycle)
}

export function showDelete(billingCycle) {
    return showTab('tabDelete', billingCycle)
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}